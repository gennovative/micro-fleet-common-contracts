export enum DbSettingKeys {
	/**
	 * Name of database engine.
	 * Data type: enum `DbClient` in `back-lib-persistence`
	 */
	DB_ENGINE = 'db_engine_',

	/**
	 * IP or host name of database. 
	 * Must use with connection index: DB_HOST + '0', DB_HOST + '1'
	 * Data type: string
	 */
	DB_ADDRESS = 'db_host_',

	/**
	 * Username to log into database. 
	 * Must use with connection index: DB_USER + '0', DB_USER + '1'
	 * Data type: string
	 */
	DB_USER = 'db_user_',

	/**
	 * Password to log into database. 
	 * Must use with connection index: DB_PASSWORD + '0', DB_PASSWORD + '1'
	 * Data type: string
	 */
	DB_PASSWORD = 'db_pass_',

	/**
	 * Database name.
	 * Must use with connection index: DB_NAME + '0', DB_NAME + '1'
	 * Data type: string
	 */
	DB_NAME = 'db_name_',

	/**
	 * Path to database file.
	 * Must use with connection index: DB_FILE + '0', DB_FILE + '1'
	 * Data type: string
	 */
	DB_FILE = 'db_file_',

	/**
	 * Database connection string.
	 * Must use with connection index: DB_CONN_STRING + '0', DB_CONN_STRING + '1'
	 * Data type: string
	 */
	DB_CONN_STRING = 'db_connStr_',
}