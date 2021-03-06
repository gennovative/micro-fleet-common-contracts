## VERSIONS

### 2.3.0
- Sync version with other packages.
- Use decorators for validation rules.
- `DependencyContainer` supports resolving to factory function.
- `Maybe` and `Result` have name for better logging and debugging.
- `JoiModelValidator` supports raw Joi schema.

### 1.4.0
- [Breaking change] Re-implemented `Maybe`.
- Removed action and module constant names.
- Added property "detail" to class `Exception`.
- Added Id classes for DDD.

### 1.3.3
- Extracts `IModelAutoMapper` and `IModelValidator`.

### 1.3.2
- New getter `ModelAutoMapper.internalMapper` for advanced mapping configuration.
- Replaced term "DTO" with "Domain model".
- Added `JoiExtended.dateString` validation rule.
- Split `ModelAutoMapper.whole` and `ModelAutoMapper.partial` to `whole`, `wholeMany`, `partial` and `partialMany`.
- `JoiModelValidator.create` now accepts single param object.
- Implemented `AccessorSupportMapper` to fix [#2](https://github.com/gennovative/micro-fleet-common/issues/2) (ModelAutoMapper should support mapping getters and setters)
- Added static method `ValidationError.fromJoi` to fix [#3](https://github.com/gennovative/micro-fleet-common/issues/3) (ValidationError constructor should not reference joi)
- Removed JS native `BigInt`, and using string instead.

### 1.3.1
- Removed script "postinstall" from `package.json`.

### 1.3.0
- Replace TS type `BigInt` with JS native `BigInt`

### 1.2.4
- Fixed node engine version in package.json
- Refactor to replace `let` with `const`.
- Removed "bluebird-global"

### 1.2.3
- `HandlerContainer.register` accepts `paramCount` as last parameter.
- `HandlerContainer` uses `ServiceContext` internally, no need to set dependency container for it anymore.
- Fixed a bug where `HandlerContainer.register` overrides action with same name, but different dependency identifier.
- Added auth setting keys.
- Added `ServiceContext` class.

### 1.2.2
- Moved repository interfaces to `@micro-fleet/persistence`.

### 1.2.1
- Merged with deprecated `common-constants` package.

### 1.2.0
- Added **CacheSettings** and **ICacheConnectionDetail**.
- Added function `asObject` to **PagedArray**.
- Set **JoiModelValidator** to not require PK as default.
- Updated to latest dependency versions and relevant unittests.

### 1.1.0

* **IRepository**: 
    - Added generic param for id data type, to support composite primary key.
    - Supports write operations (update, path, delete) on multiple items.
    - Differentiates read operations between active and soft-deleted records.
* **TenantPk**: Primary key data type that support multi-tenancy.
* **IHardDelRepository**: Extends from `IRepository`, supports hard deletion.
* **JoiModelValidator**: Added support for composite primary key.
* **SettingItemDataType**: Added 2 types StringArray and NumberArray.
* **DatabaseSettings**: Wraps an array of database settings.
* **DbConnectionSetting**: Wraps an array of database connection settings.
* **Types**: Dependency identifier for `IConfigurationProvider` and `IDependencyContainer` (moved from `back-lib-foundation`).

### 1.0.0

* **PagedArray<T>**: A derived Array class that supports pagination.
* **IRepository**: Provides common methods for repositories.
* Use **BigSInt** (alias of `string`) as data type of model ID.
* **ModelValidatorBase**: Base class that provides methods to validate models.
* **ModelTranslatorBase**: Base class that provides methods to convert arbitrary objects to models.
* **GetSettingRequest**, **GetSettingRequestValidator**, **GetSettingRequestTranslator**: Request model to fetch service settings, comes with its validators and translators.
* **AtomicSession** (use with **AtomicSessionFactory** and **AtomicSessionFlow**): supports transactional queries.
* Test coverage: **100%**