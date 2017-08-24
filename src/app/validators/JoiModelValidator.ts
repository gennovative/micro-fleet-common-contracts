import * as joi from 'joi';
import { Guard } from 'back-lib-common-util';

import { ValidationError } from './ValidationError';


export interface ValidationOptions extends joi.ValidationOptions {
	/**
	 * If `true`, validates model PK. Otherwise, excludes model PK from validation.
	 * Default to `false`.
	 */
	isEdit?: boolean;
}

export class JoiModelValidator<T> {

	/**
	 * Builds a new instance of ModelValidatorBase.
	 * @param {joi.SchemaMap} schemaMapModel Rules to validate model properties.
	 * @param {boolean} isCompoundPk Whether the primary key is compound. Default to `false`.
	 * 	This param is IGNORED if param `schemaMapPk` has value.
	 * @param {joi.SchemaMap} schemaMapPk Rule to validate model PK.
	 */
	public static create<T>(schemaMapModel: joi.SchemaMap, isCompoundPk: boolean = false, schemaMapPk?: joi.SchemaMap): JoiModelValidator<T> {
		let validator = new JoiModelValidator<T>(schemaMapModel, isCompoundPk, schemaMapPk);
		validator.compile();
		return validator;
	}


	/**
	 * Compiled rules for compound model primary key.
	 */
	protected _compiledPk: joi.ObjectSchema;

	/**
	 * Compiled rules for model properties.
	 */
	protected _compiledWhole: joi.ObjectSchema;

	/**
	 * Compiled rules for model properties, but all of them are OPTIONAL.
	 * Used for patch operation.
	 */
	protected _compiledPartial: joi.ObjectSchema;


	/**
	 * 
	 * @param {joi.SchemaMap} _schemaMap Rules to validate model properties.
	 * @param {boolean} _isCompositePk Whether the primary key is compound. Default to `false`
	 * 		This param is IGNORED if param `schemaMapPk` has value.
	 * @param {joi.SchemaMap} _schemaMapId Rule to validate model PK.
	 */
	protected constructor(
		protected _schemaMap: joi.SchemaMap,
		protected _isCompositePk: boolean = false,
		protected _schemaMapPk?: joi.SchemaMap,
	) {
		// As default, model ID is a string of 64-bit integer.
		// JS cannot handle 64-bit integer, that's why we must use string.
		// The database will convert to BigInt type when inserting.
		let idSchema = joi.string().regex(/^\d+$/).required();

		if (_schemaMapPk) {
			this._schemaMapPk = _schemaMapPk;
		} else if (_isCompositePk) {
			// this._compiledPk = joi.object({
			// 		id: idSchema,
			// 		tenantId: idSchema
			// 	})
			// 	.required();
			this._schemaMapPk = {
					id: idSchema,
					tenantId: idSchema
				};
		} else {
			this._schemaMapPk = { id: idSchema };
			this._compiledPk = <any>idSchema;
		}
	}


	public get schemaMap(): joi.SchemaMap {
		return this._schemaMap;
	}

	public get schemaMapPk(): joi.SchemaMap {
		return this._schemaMapPk;
	}

	public get isCompoundPk(): boolean {
		return this._isCompositePk;
	}


	/**
	 * Validates model PK.
	 */
	public pk(pk: any): [ValidationError, any] {
		Guard.assertIsDefined(this._compiledPk, 'Must call `compile` before using this function!');
		let { error, value } = this._compiledPk.validate<any>(pk);
		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}

	/**
	 * Validates model for creation operation, which doesn't need `pk` property.
	 */
	public whole(target: any, options: ValidationOptions = {}): [ValidationError, T] {
		return this.validate(this._compiledWhole, target, options);
	}

	/**
	 * Validates model for modification operation, which requires `pk` property.
	 */
	public partial(target: any, options: ValidationOptions = {}): [ValidationError, Partial<T>] {
		return this.validate(this._compiledPartial, target, options);
	}

	/**
	 * Must call this method before using `whole` or `partial`,
	 * or after `schemaMap` or `schemaMapId` is changed.
	 */
	public compile(): void {
		let wholeSchema = this._schemaMap;
		this._compiledWhole = joi.object(wholeSchema);

		// Make all rules optional for partial schema.
		let partialSchema: joi.SchemaMap = {};
		for (let key in wholeSchema) {
			/* istanbul ignore else */
			if (wholeSchema.hasOwnProperty(key)) {
				let rule = wholeSchema[key] as joi.Schema;
				/* istanbul ignore else */
				if (typeof rule.optional === 'function') {
					partialSchema[key] = rule.optional();
				}
			}
		}
		this._compiledPartial = joi.object(partialSchema);

		if (this._compiledPk) { return; }

		if (this._isCompositePk) {
			this._compiledPk = joi.object(this._schemaMapPk);
			return;
		}

		// Compile rule for simple PK with only one property
		let idMap = this.schemaMapPk;
		for (let key in idMap) {
			/* istanbul ignore else */
			if (idMap.hasOwnProperty(key)) {
				this._compiledPk = idMap[key] as joi.ObjectSchema;
				break; // Only get the first rule
			}
		}
	}

	protected validate(schema: joi.ObjectSchema, target: any, options: ValidationOptions = {}): [ValidationError, T] {
		Guard.assertIsDefined(schema, 'Must call `compile` before using this function!');

		let opts = Object.assign({
				abortEarly: false,
				allowUnknown: true,
				stripUnknown: true,
				isEdit: false
			}, options);

		// If edit mode, validate pk property.
		schema = opts.isEdit ? schema.keys(this._schemaMapPk) : schema;
		delete opts.isEdit;
		let { error, value } = schema.validate<T>(target, opts);

		return (error) ? [new ValidationError(error.details), null] : [null, value];
	}
}