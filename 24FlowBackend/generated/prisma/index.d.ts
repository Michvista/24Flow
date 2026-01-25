
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Conflict
 * 
 */
export type Conflict = $Result.DefaultSelection<Prisma.$ConflictPayload>
/**
 * Model ConflictTask
 * 
 */
export type ConflictTask = $Result.DefaultSelection<Prisma.$ConflictTaskPayload>
/**
 * Model ConflictProposal
 * 
 */
export type ConflictProposal = $Result.DefaultSelection<Prisma.$ConflictProposalPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model MoodLog
 * 
 */
export type MoodLog = $Result.DefaultSelection<Prisma.$MoodLogPayload>
/**
 * Model SleepLog
 * 
 */
export type SleepLog = $Result.DefaultSelection<Prisma.$SleepLogPayload>
/**
 * Model BehaviorSummary
 * 
 */
export type BehaviorSummary = $Result.DefaultSelection<Prisma.$BehaviorSummaryPayload>
/**
 * Model Preferences
 * 
 */
export type Preferences = $Result.DefaultSelection<Prisma.$PreferencesPayload>
/**
 * Model AITools
 * 
 */
export type AITools = $Result.DefaultSelection<Prisma.$AIToolsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ConflictStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  AUTO_RESOLVED: 'AUTO_RESOLVED'
};

export type ConflictStatus = (typeof ConflictStatus)[keyof typeof ConflictStatus]


export const TaskType: {
  STATIC: 'STATIC',
  CONFLICT: 'CONFLICT'
};

export type TaskType = (typeof TaskType)[keyof typeof TaskType]


export const Priority: {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type Priority = (typeof Priority)[keyof typeof Priority]

}

export type ConflictStatus = $Enums.ConflictStatus

export const ConflictStatus: typeof $Enums.ConflictStatus

export type TaskType = $Enums.TaskType

export const TaskType: typeof $Enums.TaskType

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conflict`: Exposes CRUD operations for the **Conflict** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conflicts
    * const conflicts = await prisma.conflict.findMany()
    * ```
    */
  get conflict(): Prisma.ConflictDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conflictTask`: Exposes CRUD operations for the **ConflictTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConflictTasks
    * const conflictTasks = await prisma.conflictTask.findMany()
    * ```
    */
  get conflictTask(): Prisma.ConflictTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conflictProposal`: Exposes CRUD operations for the **ConflictProposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConflictProposals
    * const conflictProposals = await prisma.conflictProposal.findMany()
    * ```
    */
  get conflictProposal(): Prisma.ConflictProposalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moodLog`: Exposes CRUD operations for the **MoodLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoodLogs
    * const moodLogs = await prisma.moodLog.findMany()
    * ```
    */
  get moodLog(): Prisma.MoodLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sleepLog`: Exposes CRUD operations for the **SleepLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SleepLogs
    * const sleepLogs = await prisma.sleepLog.findMany()
    * ```
    */
  get sleepLog(): Prisma.SleepLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.behaviorSummary`: Exposes CRUD operations for the **BehaviorSummary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BehaviorSummaries
    * const behaviorSummaries = await prisma.behaviorSummary.findMany()
    * ```
    */
  get behaviorSummary(): Prisma.BehaviorSummaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preferences`: Exposes CRUD operations for the **Preferences** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Preferences
    * const preferences = await prisma.preferences.findMany()
    * ```
    */
  get preferences(): Prisma.PreferencesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aITools`: Exposes CRUD operations for the **AITools** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AITools
    * const aITools = await prisma.aITools.findMany()
    * ```
    */
  get aITools(): Prisma.AIToolsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Event: 'Event',
    Conflict: 'Conflict',
    ConflictTask: 'ConflictTask',
    ConflictProposal: 'ConflictProposal',
    Task: 'Task',
    MoodLog: 'MoodLog',
    SleepLog: 'SleepLog',
    BehaviorSummary: 'BehaviorSummary',
    Preferences: 'Preferences',
    AITools: 'AITools'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "event" | "conflict" | "conflictTask" | "conflictProposal" | "task" | "moodLog" | "sleepLog" | "behaviorSummary" | "preferences" | "aITools"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Conflict: {
        payload: Prisma.$ConflictPayload<ExtArgs>
        fields: Prisma.ConflictFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConflictFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConflictFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          findFirst: {
            args: Prisma.ConflictFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConflictFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          findMany: {
            args: Prisma.ConflictFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[]
          }
          create: {
            args: Prisma.ConflictCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          createMany: {
            args: Prisma.ConflictCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConflictCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[]
          }
          delete: {
            args: Prisma.ConflictDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          update: {
            args: Prisma.ConflictUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          deleteMany: {
            args: Prisma.ConflictDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConflictUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConflictUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[]
          }
          upsert: {
            args: Prisma.ConflictUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictPayload>
          }
          aggregate: {
            args: Prisma.ConflictAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConflict>
          }
          groupBy: {
            args: Prisma.ConflictGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConflictGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConflictCountArgs<ExtArgs>
            result: $Utils.Optional<ConflictCountAggregateOutputType> | number
          }
        }
      }
      ConflictTask: {
        payload: Prisma.$ConflictTaskPayload<ExtArgs>
        fields: Prisma.ConflictTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConflictTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConflictTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          findFirst: {
            args: Prisma.ConflictTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConflictTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          findMany: {
            args: Prisma.ConflictTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>[]
          }
          create: {
            args: Prisma.ConflictTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          createMany: {
            args: Prisma.ConflictTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConflictTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>[]
          }
          delete: {
            args: Prisma.ConflictTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          update: {
            args: Prisma.ConflictTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          deleteMany: {
            args: Prisma.ConflictTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConflictTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConflictTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>[]
          }
          upsert: {
            args: Prisma.ConflictTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictTaskPayload>
          }
          aggregate: {
            args: Prisma.ConflictTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConflictTask>
          }
          groupBy: {
            args: Prisma.ConflictTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConflictTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConflictTaskCountArgs<ExtArgs>
            result: $Utils.Optional<ConflictTaskCountAggregateOutputType> | number
          }
        }
      }
      ConflictProposal: {
        payload: Prisma.$ConflictProposalPayload<ExtArgs>
        fields: Prisma.ConflictProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConflictProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConflictProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          findFirst: {
            args: Prisma.ConflictProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConflictProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          findMany: {
            args: Prisma.ConflictProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>[]
          }
          create: {
            args: Prisma.ConflictProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          createMany: {
            args: Prisma.ConflictProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConflictProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>[]
          }
          delete: {
            args: Prisma.ConflictProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          update: {
            args: Prisma.ConflictProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          deleteMany: {
            args: Prisma.ConflictProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConflictProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConflictProposalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>[]
          }
          upsert: {
            args: Prisma.ConflictProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConflictProposalPayload>
          }
          aggregate: {
            args: Prisma.ConflictProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConflictProposal>
          }
          groupBy: {
            args: Prisma.ConflictProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConflictProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConflictProposalCountArgs<ExtArgs>
            result: $Utils.Optional<ConflictProposalCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      MoodLog: {
        payload: Prisma.$MoodLogPayload<ExtArgs>
        fields: Prisma.MoodLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          findFirst: {
            args: Prisma.MoodLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          findMany: {
            args: Prisma.MoodLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>[]
          }
          create: {
            args: Prisma.MoodLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          createMany: {
            args: Prisma.MoodLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>[]
          }
          delete: {
            args: Prisma.MoodLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          update: {
            args: Prisma.MoodLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          deleteMany: {
            args: Prisma.MoodLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>[]
          }
          upsert: {
            args: Prisma.MoodLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodLogPayload>
          }
          aggregate: {
            args: Prisma.MoodLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoodLog>
          }
          groupBy: {
            args: Prisma.MoodLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodLogCountArgs<ExtArgs>
            result: $Utils.Optional<MoodLogCountAggregateOutputType> | number
          }
        }
      }
      SleepLog: {
        payload: Prisma.$SleepLogPayload<ExtArgs>
        fields: Prisma.SleepLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SleepLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SleepLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          findFirst: {
            args: Prisma.SleepLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SleepLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          findMany: {
            args: Prisma.SleepLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>[]
          }
          create: {
            args: Prisma.SleepLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          createMany: {
            args: Prisma.SleepLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SleepLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>[]
          }
          delete: {
            args: Prisma.SleepLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          update: {
            args: Prisma.SleepLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          deleteMany: {
            args: Prisma.SleepLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SleepLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SleepLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>[]
          }
          upsert: {
            args: Prisma.SleepLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SleepLogPayload>
          }
          aggregate: {
            args: Prisma.SleepLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSleepLog>
          }
          groupBy: {
            args: Prisma.SleepLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SleepLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SleepLogCountArgs<ExtArgs>
            result: $Utils.Optional<SleepLogCountAggregateOutputType> | number
          }
        }
      }
      BehaviorSummary: {
        payload: Prisma.$BehaviorSummaryPayload<ExtArgs>
        fields: Prisma.BehaviorSummaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BehaviorSummaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BehaviorSummaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          findFirst: {
            args: Prisma.BehaviorSummaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BehaviorSummaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          findMany: {
            args: Prisma.BehaviorSummaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>[]
          }
          create: {
            args: Prisma.BehaviorSummaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          createMany: {
            args: Prisma.BehaviorSummaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BehaviorSummaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>[]
          }
          delete: {
            args: Prisma.BehaviorSummaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          update: {
            args: Prisma.BehaviorSummaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          deleteMany: {
            args: Prisma.BehaviorSummaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BehaviorSummaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BehaviorSummaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>[]
          }
          upsert: {
            args: Prisma.BehaviorSummaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BehaviorSummaryPayload>
          }
          aggregate: {
            args: Prisma.BehaviorSummaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBehaviorSummary>
          }
          groupBy: {
            args: Prisma.BehaviorSummaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BehaviorSummaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BehaviorSummaryCountArgs<ExtArgs>
            result: $Utils.Optional<BehaviorSummaryCountAggregateOutputType> | number
          }
        }
      }
      Preferences: {
        payload: Prisma.$PreferencesPayload<ExtArgs>
        fields: Prisma.PreferencesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreferencesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreferencesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          findFirst: {
            args: Prisma.PreferencesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreferencesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          findMany: {
            args: Prisma.PreferencesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>[]
          }
          create: {
            args: Prisma.PreferencesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          createMany: {
            args: Prisma.PreferencesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreferencesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>[]
          }
          delete: {
            args: Prisma.PreferencesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          update: {
            args: Prisma.PreferencesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          deleteMany: {
            args: Prisma.PreferencesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreferencesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreferencesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>[]
          }
          upsert: {
            args: Prisma.PreferencesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencesPayload>
          }
          aggregate: {
            args: Prisma.PreferencesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreferences>
          }
          groupBy: {
            args: Prisma.PreferencesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreferencesGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreferencesCountArgs<ExtArgs>
            result: $Utils.Optional<PreferencesCountAggregateOutputType> | number
          }
        }
      }
      AITools: {
        payload: Prisma.$AIToolsPayload<ExtArgs>
        fields: Prisma.AIToolsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIToolsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIToolsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          findFirst: {
            args: Prisma.AIToolsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIToolsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          findMany: {
            args: Prisma.AIToolsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>[]
          }
          create: {
            args: Prisma.AIToolsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          createMany: {
            args: Prisma.AIToolsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIToolsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>[]
          }
          delete: {
            args: Prisma.AIToolsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          update: {
            args: Prisma.AIToolsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          deleteMany: {
            args: Prisma.AIToolsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIToolsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIToolsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>[]
          }
          upsert: {
            args: Prisma.AIToolsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIToolsPayload>
          }
          aggregate: {
            args: Prisma.AIToolsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAITools>
          }
          groupBy: {
            args: Prisma.AIToolsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIToolsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIToolsCountArgs<ExtArgs>
            result: $Utils.Optional<AIToolsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    event?: EventOmit
    conflict?: ConflictOmit
    conflictTask?: ConflictTaskOmit
    conflictProposal?: ConflictProposalOmit
    task?: TaskOmit
    moodLog?: MoodLogOmit
    sleepLog?: SleepLogOmit
    behaviorSummary?: BehaviorSummaryOmit
    preferences?: PreferencesOmit
    aITools?: AIToolsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    events: number
    tasks: number
    moods: number
    actions: number
    conflicts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    moods?: boolean | UserCountOutputTypeCountMoodsArgs
    actions?: boolean | UserCountOutputTypeCountActionsArgs
    conflicts?: boolean | UserCountOutputTypeCountConflictsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIToolsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConflictsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    conflictTasks: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflictTasks?: boolean | EventCountOutputTypeCountConflictTasksArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountConflictTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictTaskWhereInput
  }


  /**
   * Count Type ConflictCountOutputType
   */

  export type ConflictCountOutputType = {
    tasks: number
    proposals: number
  }

  export type ConflictCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ConflictCountOutputTypeCountTasksArgs
    proposals?: boolean | ConflictCountOutputTypeCountProposalsArgs
  }

  // Custom InputTypes
  /**
   * ConflictCountOutputType without action
   */
  export type ConflictCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictCountOutputType
     */
    select?: ConflictCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConflictCountOutputType without action
   */
  export type ConflictCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictTaskWhereInput
  }

  /**
   * ConflictCountOutputType without action
   */
  export type ConflictCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictProposalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    googleId: string | null
    password: string | null
    avatar: string | null
    email: string | null
    name: string | null
    username: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    googleId: string | null
    password: string | null
    avatar: string | null
    email: string | null
    name: string | null
    username: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    googleId: number
    password: number
    avatar: number
    email: number
    name: number
    username: number
    bio: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    googleId?: true
    password?: true
    avatar?: true
    email?: true
    name?: true
    username?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    googleId?: true
    password?: true
    avatar?: true
    email?: true
    name?: true
    username?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    googleId?: true
    password?: true
    avatar?: true
    email?: true
    name?: true
    username?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    googleId: string | null
    password: string | null
    avatar: string | null
    email: string
    name: string | null
    username: string | null
    bio: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | User$eventsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    moods?: boolean | User$moodsArgs<ExtArgs>
    sleep?: boolean | User$sleepArgs<ExtArgs>
    behavior?: boolean | User$behaviorArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    actions?: boolean | User$actionsArgs<ExtArgs>
    conflicts?: boolean | User$conflictsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    googleId?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googleId" | "password" | "avatar" | "email" | "name" | "username" | "bio" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | User$eventsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    moods?: boolean | User$moodsArgs<ExtArgs>
    sleep?: boolean | User$sleepArgs<ExtArgs>
    behavior?: boolean | User$behaviorArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    actions?: boolean | User$actionsArgs<ExtArgs>
    conflicts?: boolean | User$conflictsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      moods: Prisma.$MoodLogPayload<ExtArgs>[]
      sleep: Prisma.$SleepLogPayload<ExtArgs> | null
      behavior: Prisma.$BehaviorSummaryPayload<ExtArgs> | null
      preferences: Prisma.$PreferencesPayload<ExtArgs> | null
      actions: Prisma.$AIToolsPayload<ExtArgs>[]
      conflicts: Prisma.$ConflictPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      googleId: string | null
      password: string | null
      avatar: string | null
      email: string
      name: string | null
      username: string | null
      bio: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    moods<T extends User$moodsArgs<ExtArgs> = {}>(args?: Subset<T, User$moodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sleep<T extends User$sleepArgs<ExtArgs> = {}>(args?: Subset<T, User$sleepArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    behavior<T extends User$behaviorArgs<ExtArgs> = {}>(args?: Subset<T, User$behaviorArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    preferences<T extends User$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$preferencesArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    actions<T extends User$actionsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conflicts<T extends User$conflictsArgs<ExtArgs> = {}>(args?: Subset<T, User$conflictsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.moods
   */
  export type User$moodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    where?: MoodLogWhereInput
    orderBy?: MoodLogOrderByWithRelationInput | MoodLogOrderByWithRelationInput[]
    cursor?: MoodLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoodLogScalarFieldEnum | MoodLogScalarFieldEnum[]
  }

  /**
   * User.sleep
   */
  export type User$sleepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    where?: SleepLogWhereInput
  }

  /**
   * User.behavior
   */
  export type User$behaviorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    where?: BehaviorSummaryWhereInput
  }

  /**
   * User.preferences
   */
  export type User$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    where?: PreferencesWhereInput
  }

  /**
   * User.actions
   */
  export type User$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    where?: AIToolsWhereInput
    orderBy?: AIToolsOrderByWithRelationInput | AIToolsOrderByWithRelationInput[]
    cursor?: AIToolsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIToolsScalarFieldEnum | AIToolsScalarFieldEnum[]
  }

  /**
   * User.conflicts
   */
  export type User$conflictsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    where?: ConflictWhereInput
    orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[]
    cursor?: ConflictWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    recurringDays: number | null
  }

  export type EventSumAggregateOutputType = {
    recurringDays: number[]
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    title: string | null
    location: string | null
    desc: string | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    color: string | null
    colorName: string | null
    textColor: string | null
    userId: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    location: string | null
    desc: string | null
    startTime: Date | null
    endTime: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    color: string | null
    colorName: string | null
    textColor: string | null
    userId: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    location: number
    desc: number
    startTime: number
    endTime: number
    recurringDays: number
    createdAt: number
    updatedAt: number
    color: number
    colorName: number
    textColor: number
    userId: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    recurringDays?: true
  }

  export type EventSumAggregateInputType = {
    recurringDays?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    location?: true
    desc?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    color?: true
    colorName?: true
    textColor?: true
    userId?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    location?: true
    desc?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    color?: true
    colorName?: true
    textColor?: true
    userId?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    location?: true
    desc?: true
    startTime?: true
    endTime?: true
    recurringDays?: true
    createdAt?: true
    updatedAt?: true
    color?: true
    colorName?: true
    textColor?: true
    userId?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: string
    location: string | null
    desc: string | null
    startTime: Date
    endTime: Date
    recurringDays: number[]
    createdAt: Date
    updatedAt: Date
    color: string
    colorName: string
    textColor: string
    userId: string
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    location?: boolean
    desc?: boolean
    startTime?: boolean
    endTime?: boolean
    recurringDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    color?: boolean
    colorName?: boolean
    textColor?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    conflictTasks?: boolean | Event$conflictTasksArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    location?: boolean
    desc?: boolean
    startTime?: boolean
    endTime?: boolean
    recurringDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    color?: boolean
    colorName?: boolean
    textColor?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    location?: boolean
    desc?: boolean
    startTime?: boolean
    endTime?: boolean
    recurringDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    color?: boolean
    colorName?: boolean
    textColor?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    location?: boolean
    desc?: boolean
    startTime?: boolean
    endTime?: boolean
    recurringDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    color?: boolean
    colorName?: boolean
    textColor?: boolean
    userId?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "location" | "desc" | "startTime" | "endTime" | "recurringDays" | "createdAt" | "updatedAt" | "color" | "colorName" | "textColor" | "userId", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    conflictTasks?: boolean | Event$conflictTasksArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      conflictTasks: Prisma.$ConflictTaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      location: string | null
      desc: string | null
      startTime: Date
      endTime: Date
      recurringDays: number[]
      createdAt: Date
      updatedAt: Date
      color: string
      colorName: string
      textColor: string
      userId: string
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conflictTasks<T extends Event$conflictTasksArgs<ExtArgs> = {}>(args?: Subset<T, Event$conflictTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly location: FieldRef<"Event", 'String'>
    readonly desc: FieldRef<"Event", 'String'>
    readonly startTime: FieldRef<"Event", 'DateTime'>
    readonly endTime: FieldRef<"Event", 'DateTime'>
    readonly recurringDays: FieldRef<"Event", 'Int[]'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
    readonly color: FieldRef<"Event", 'String'>
    readonly colorName: FieldRef<"Event", 'String'>
    readonly textColor: FieldRef<"Event", 'String'>
    readonly userId: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.conflictTasks
   */
  export type Event$conflictTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    where?: ConflictTaskWhereInput
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    cursor?: ConflictTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConflictTaskScalarFieldEnum | ConflictTaskScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Conflict
   */

  export type AggregateConflict = {
    _count: ConflictCountAggregateOutputType | null
    _min: ConflictMinAggregateOutputType | null
    _max: ConflictMaxAggregateOutputType | null
  }

  export type ConflictMinAggregateOutputType = {
    id: string | null
    userId: string | null
    errorId: string | null
    summary: string | null
    analysis: string | null
    status: $Enums.ConflictStatus | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type ConflictMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    errorId: string | null
    summary: string | null
    analysis: string | null
    status: $Enums.ConflictStatus | null
    detectedAt: Date | null
    resolvedAt: Date | null
  }

  export type ConflictCountAggregateOutputType = {
    id: number
    userId: number
    errorId: number
    summary: number
    analysis: number
    status: number
    detectedAt: number
    resolvedAt: number
    _all: number
  }


  export type ConflictMinAggregateInputType = {
    id?: true
    userId?: true
    errorId?: true
    summary?: true
    analysis?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type ConflictMaxAggregateInputType = {
    id?: true
    userId?: true
    errorId?: true
    summary?: true
    analysis?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
  }

  export type ConflictCountAggregateInputType = {
    id?: true
    userId?: true
    errorId?: true
    summary?: true
    analysis?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type ConflictAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conflict to aggregate.
     */
    where?: ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conflicts to fetch.
     */
    orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conflicts
    **/
    _count?: true | ConflictCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConflictMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConflictMaxAggregateInputType
  }

  export type GetConflictAggregateType<T extends ConflictAggregateArgs> = {
        [P in keyof T & keyof AggregateConflict]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConflict[P]>
      : GetScalarType<T[P], AggregateConflict[P]>
  }




  export type ConflictGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictWhereInput
    orderBy?: ConflictOrderByWithAggregationInput | ConflictOrderByWithAggregationInput[]
    by: ConflictScalarFieldEnum[] | ConflictScalarFieldEnum
    having?: ConflictScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConflictCountAggregateInputType | true
    _min?: ConflictMinAggregateInputType
    _max?: ConflictMaxAggregateInputType
  }

  export type ConflictGroupByOutputType = {
    id: string
    userId: string
    errorId: string
    summary: string
    analysis: string
    status: $Enums.ConflictStatus
    detectedAt: Date
    resolvedAt: Date | null
    _count: ConflictCountAggregateOutputType | null
    _min: ConflictMinAggregateOutputType | null
    _max: ConflictMaxAggregateOutputType | null
  }

  type GetConflictGroupByPayload<T extends ConflictGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConflictGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConflictGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConflictGroupByOutputType[P]>
            : GetScalarType<T[P], ConflictGroupByOutputType[P]>
        }
      >
    >


  export type ConflictSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    errorId?: boolean
    summary?: boolean
    analysis?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Conflict$tasksArgs<ExtArgs>
    proposals?: boolean | Conflict$proposalsArgs<ExtArgs>
    _count?: boolean | ConflictCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflict"]>

  export type ConflictSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    errorId?: boolean
    summary?: boolean
    analysis?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflict"]>

  export type ConflictSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    errorId?: boolean
    summary?: boolean
    analysis?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflict"]>

  export type ConflictSelectScalar = {
    id?: boolean
    userId?: boolean
    errorId?: boolean
    summary?: boolean
    analysis?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
  }

  export type ConflictOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "errorId" | "summary" | "analysis" | "status" | "detectedAt" | "resolvedAt", ExtArgs["result"]["conflict"]>
  export type ConflictInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Conflict$tasksArgs<ExtArgs>
    proposals?: boolean | Conflict$proposalsArgs<ExtArgs>
    _count?: boolean | ConflictCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConflictIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConflictIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConflictPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conflict"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$ConflictTaskPayload<ExtArgs>[]
      proposals: Prisma.$ConflictProposalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      errorId: string
      summary: string
      analysis: string
      status: $Enums.ConflictStatus
      detectedAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["conflict"]>
    composites: {}
  }

  type ConflictGetPayload<S extends boolean | null | undefined | ConflictDefaultArgs> = $Result.GetResult<Prisma.$ConflictPayload, S>

  type ConflictCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConflictFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConflictCountAggregateInputType | true
    }

  export interface ConflictDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conflict'], meta: { name: 'Conflict' } }
    /**
     * Find zero or one Conflict that matches the filter.
     * @param {ConflictFindUniqueArgs} args - Arguments to find a Conflict
     * @example
     * // Get one Conflict
     * const conflict = await prisma.conflict.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConflictFindUniqueArgs>(args: SelectSubset<T, ConflictFindUniqueArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conflict that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConflictFindUniqueOrThrowArgs} args - Arguments to find a Conflict
     * @example
     * // Get one Conflict
     * const conflict = await prisma.conflict.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConflictFindUniqueOrThrowArgs>(args: SelectSubset<T, ConflictFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conflict that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictFindFirstArgs} args - Arguments to find a Conflict
     * @example
     * // Get one Conflict
     * const conflict = await prisma.conflict.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConflictFindFirstArgs>(args?: SelectSubset<T, ConflictFindFirstArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conflict that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictFindFirstOrThrowArgs} args - Arguments to find a Conflict
     * @example
     * // Get one Conflict
     * const conflict = await prisma.conflict.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConflictFindFirstOrThrowArgs>(args?: SelectSubset<T, ConflictFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conflicts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conflicts
     * const conflicts = await prisma.conflict.findMany()
     * 
     * // Get first 10 Conflicts
     * const conflicts = await prisma.conflict.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conflictWithIdOnly = await prisma.conflict.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConflictFindManyArgs>(args?: SelectSubset<T, ConflictFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conflict.
     * @param {ConflictCreateArgs} args - Arguments to create a Conflict.
     * @example
     * // Create one Conflict
     * const Conflict = await prisma.conflict.create({
     *   data: {
     *     // ... data to create a Conflict
     *   }
     * })
     * 
     */
    create<T extends ConflictCreateArgs>(args: SelectSubset<T, ConflictCreateArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conflicts.
     * @param {ConflictCreateManyArgs} args - Arguments to create many Conflicts.
     * @example
     * // Create many Conflicts
     * const conflict = await prisma.conflict.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConflictCreateManyArgs>(args?: SelectSubset<T, ConflictCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conflicts and returns the data saved in the database.
     * @param {ConflictCreateManyAndReturnArgs} args - Arguments to create many Conflicts.
     * @example
     * // Create many Conflicts
     * const conflict = await prisma.conflict.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conflicts and only return the `id`
     * const conflictWithIdOnly = await prisma.conflict.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConflictCreateManyAndReturnArgs>(args?: SelectSubset<T, ConflictCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conflict.
     * @param {ConflictDeleteArgs} args - Arguments to delete one Conflict.
     * @example
     * // Delete one Conflict
     * const Conflict = await prisma.conflict.delete({
     *   where: {
     *     // ... filter to delete one Conflict
     *   }
     * })
     * 
     */
    delete<T extends ConflictDeleteArgs>(args: SelectSubset<T, ConflictDeleteArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conflict.
     * @param {ConflictUpdateArgs} args - Arguments to update one Conflict.
     * @example
     * // Update one Conflict
     * const conflict = await prisma.conflict.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConflictUpdateArgs>(args: SelectSubset<T, ConflictUpdateArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conflicts.
     * @param {ConflictDeleteManyArgs} args - Arguments to filter Conflicts to delete.
     * @example
     * // Delete a few Conflicts
     * const { count } = await prisma.conflict.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConflictDeleteManyArgs>(args?: SelectSubset<T, ConflictDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conflicts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conflicts
     * const conflict = await prisma.conflict.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConflictUpdateManyArgs>(args: SelectSubset<T, ConflictUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conflicts and returns the data updated in the database.
     * @param {ConflictUpdateManyAndReturnArgs} args - Arguments to update many Conflicts.
     * @example
     * // Update many Conflicts
     * const conflict = await prisma.conflict.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conflicts and only return the `id`
     * const conflictWithIdOnly = await prisma.conflict.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConflictUpdateManyAndReturnArgs>(args: SelectSubset<T, ConflictUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conflict.
     * @param {ConflictUpsertArgs} args - Arguments to update or create a Conflict.
     * @example
     * // Update or create a Conflict
     * const conflict = await prisma.conflict.upsert({
     *   create: {
     *     // ... data to create a Conflict
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conflict we want to update
     *   }
     * })
     */
    upsert<T extends ConflictUpsertArgs>(args: SelectSubset<T, ConflictUpsertArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conflicts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictCountArgs} args - Arguments to filter Conflicts to count.
     * @example
     * // Count the number of Conflicts
     * const count = await prisma.conflict.count({
     *   where: {
     *     // ... the filter for the Conflicts we want to count
     *   }
     * })
    **/
    count<T extends ConflictCountArgs>(
      args?: Subset<T, ConflictCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConflictCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conflict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConflictAggregateArgs>(args: Subset<T, ConflictAggregateArgs>): Prisma.PrismaPromise<GetConflictAggregateType<T>>

    /**
     * Group by Conflict.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConflictGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConflictGroupByArgs['orderBy'] }
        : { orderBy?: ConflictGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConflictGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConflictGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conflict model
   */
  readonly fields: ConflictFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conflict.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConflictClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Conflict$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Conflict$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proposals<T extends Conflict$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, Conflict$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conflict model
   */
  interface ConflictFieldRefs {
    readonly id: FieldRef<"Conflict", 'String'>
    readonly userId: FieldRef<"Conflict", 'String'>
    readonly errorId: FieldRef<"Conflict", 'String'>
    readonly summary: FieldRef<"Conflict", 'String'>
    readonly analysis: FieldRef<"Conflict", 'String'>
    readonly status: FieldRef<"Conflict", 'ConflictStatus'>
    readonly detectedAt: FieldRef<"Conflict", 'DateTime'>
    readonly resolvedAt: FieldRef<"Conflict", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conflict findUnique
   */
  export type ConflictFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter, which Conflict to fetch.
     */
    where: ConflictWhereUniqueInput
  }

  /**
   * Conflict findUniqueOrThrow
   */
  export type ConflictFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter, which Conflict to fetch.
     */
    where: ConflictWhereUniqueInput
  }

  /**
   * Conflict findFirst
   */
  export type ConflictFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter, which Conflict to fetch.
     */
    where?: ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conflicts to fetch.
     */
    orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conflicts.
     */
    cursor?: ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conflicts.
     */
    distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[]
  }

  /**
   * Conflict findFirstOrThrow
   */
  export type ConflictFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter, which Conflict to fetch.
     */
    where?: ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conflicts to fetch.
     */
    orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conflicts.
     */
    cursor?: ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conflicts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conflicts.
     */
    distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[]
  }

  /**
   * Conflict findMany
   */
  export type ConflictFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter, which Conflicts to fetch.
     */
    where?: ConflictWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conflicts to fetch.
     */
    orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conflicts.
     */
    cursor?: ConflictWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conflicts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conflicts.
     */
    skip?: number
    distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[]
  }

  /**
   * Conflict create
   */
  export type ConflictCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * The data needed to create a Conflict.
     */
    data: XOR<ConflictCreateInput, ConflictUncheckedCreateInput>
  }

  /**
   * Conflict createMany
   */
  export type ConflictCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conflicts.
     */
    data: ConflictCreateManyInput | ConflictCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conflict createManyAndReturn
   */
  export type ConflictCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * The data used to create many Conflicts.
     */
    data: ConflictCreateManyInput | ConflictCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conflict update
   */
  export type ConflictUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * The data needed to update a Conflict.
     */
    data: XOR<ConflictUpdateInput, ConflictUncheckedUpdateInput>
    /**
     * Choose, which Conflict to update.
     */
    where: ConflictWhereUniqueInput
  }

  /**
   * Conflict updateMany
   */
  export type ConflictUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conflicts.
     */
    data: XOR<ConflictUpdateManyMutationInput, ConflictUncheckedUpdateManyInput>
    /**
     * Filter which Conflicts to update
     */
    where?: ConflictWhereInput
    /**
     * Limit how many Conflicts to update.
     */
    limit?: number
  }

  /**
   * Conflict updateManyAndReturn
   */
  export type ConflictUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * The data used to update Conflicts.
     */
    data: XOR<ConflictUpdateManyMutationInput, ConflictUncheckedUpdateManyInput>
    /**
     * Filter which Conflicts to update
     */
    where?: ConflictWhereInput
    /**
     * Limit how many Conflicts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conflict upsert
   */
  export type ConflictUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * The filter to search for the Conflict to update in case it exists.
     */
    where: ConflictWhereUniqueInput
    /**
     * In case the Conflict found by the `where` argument doesn't exist, create a new Conflict with this data.
     */
    create: XOR<ConflictCreateInput, ConflictUncheckedCreateInput>
    /**
     * In case the Conflict was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConflictUpdateInput, ConflictUncheckedUpdateInput>
  }

  /**
   * Conflict delete
   */
  export type ConflictDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
    /**
     * Filter which Conflict to delete.
     */
    where: ConflictWhereUniqueInput
  }

  /**
   * Conflict deleteMany
   */
  export type ConflictDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conflicts to delete
     */
    where?: ConflictWhereInput
    /**
     * Limit how many Conflicts to delete.
     */
    limit?: number
  }

  /**
   * Conflict.tasks
   */
  export type Conflict$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    where?: ConflictTaskWhereInput
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    cursor?: ConflictTaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConflictTaskScalarFieldEnum | ConflictTaskScalarFieldEnum[]
  }

  /**
   * Conflict.proposals
   */
  export type Conflict$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    where?: ConflictProposalWhereInput
    orderBy?: ConflictProposalOrderByWithRelationInput | ConflictProposalOrderByWithRelationInput[]
    cursor?: ConflictProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConflictProposalScalarFieldEnum | ConflictProposalScalarFieldEnum[]
  }

  /**
   * Conflict without action
   */
  export type ConflictDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conflict
     */
    select?: ConflictSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conflict
     */
    omit?: ConflictOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictInclude<ExtArgs> | null
  }


  /**
   * Model ConflictTask
   */

  export type AggregateConflictTask = {
    _count: ConflictTaskCountAggregateOutputType | null
    _avg: ConflictTaskAvgAggregateOutputType | null
    _sum: ConflictTaskSumAggregateOutputType | null
    _min: ConflictTaskMinAggregateOutputType | null
    _max: ConflictTaskMaxAggregateOutputType | null
  }

  export type ConflictTaskAvgAggregateOutputType = {
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
  }

  export type ConflictTaskSumAggregateOutputType = {
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
  }

  export type ConflictTaskMinAggregateOutputType = {
    id: string | null
    conflictId: string | null
    eventId: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
    taskType: $Enums.TaskType | null
    priority: $Enums.Priority | null
  }

  export type ConflictTaskMaxAggregateOutputType = {
    id: string | null
    conflictId: string | null
    eventId: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
    taskType: $Enums.TaskType | null
    priority: $Enums.Priority | null
  }

  export type ConflictTaskCountAggregateOutputType = {
    id: number
    conflictId: number
    eventId: number
    title: number
    startTime: number
    endTime: number
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: number
    priority: number
    _all: number
  }


  export type ConflictTaskAvgAggregateInputType = {
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
  }

  export type ConflictTaskSumAggregateInputType = {
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
  }

  export type ConflictTaskMinAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    startTime?: true
    endTime?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    priority?: true
  }

  export type ConflictTaskMaxAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    startTime?: true
    endTime?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    priority?: true
  }

  export type ConflictTaskCountAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    startTime?: true
    endTime?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    priority?: true
    _all?: true
  }

  export type ConflictTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConflictTask to aggregate.
     */
    where?: ConflictTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictTasks to fetch.
     */
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConflictTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConflictTasks
    **/
    _count?: true | ConflictTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConflictTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConflictTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConflictTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConflictTaskMaxAggregateInputType
  }

  export type GetConflictTaskAggregateType<T extends ConflictTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateConflictTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConflictTask[P]>
      : GetScalarType<T[P], AggregateConflictTask[P]>
  }




  export type ConflictTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictTaskWhereInput
    orderBy?: ConflictTaskOrderByWithAggregationInput | ConflictTaskOrderByWithAggregationInput[]
    by: ConflictTaskScalarFieldEnum[] | ConflictTaskScalarFieldEnum
    having?: ConflictTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConflictTaskCountAggregateInputType | true
    _avg?: ConflictTaskAvgAggregateInputType
    _sum?: ConflictTaskSumAggregateInputType
    _min?: ConflictTaskMinAggregateInputType
    _max?: ConflictTaskMaxAggregateInputType
  }

  export type ConflictTaskGroupByOutputType = {
    id: string
    conflictId: string
    eventId: string
    title: string
    startTime: Date
    endTime: Date
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    priority: $Enums.Priority
    _count: ConflictTaskCountAggregateOutputType | null
    _avg: ConflictTaskAvgAggregateOutputType | null
    _sum: ConflictTaskSumAggregateOutputType | null
    _min: ConflictTaskMinAggregateOutputType | null
    _max: ConflictTaskMaxAggregateOutputType | null
  }

  type GetConflictTaskGroupByPayload<T extends ConflictTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConflictTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConflictTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConflictTaskGroupByOutputType[P]>
            : GetScalarType<T[P], ConflictTaskGroupByOutputType[P]>
        }
      >
    >


  export type ConflictTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    priority?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictTask"]>

  export type ConflictTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    priority?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictTask"]>

  export type ConflictTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    priority?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictTask"]>

  export type ConflictTaskSelectScalar = {
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    priority?: boolean
  }

  export type ConflictTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conflictId" | "eventId" | "title" | "startTime" | "endTime" | "displayStart" | "displayEnd" | "relativeStart" | "relativeEnd" | "taskType" | "priority", ExtArgs["result"]["conflictTask"]>
  export type ConflictTaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type ConflictTaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type ConflictTaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $ConflictTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConflictTask"
    objects: {
      conflict: Prisma.$ConflictPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conflictId: string
      eventId: string
      title: string
      startTime: Date
      endTime: Date
      displayStart: number
      displayEnd: number
      relativeStart: number
      relativeEnd: number
      taskType: $Enums.TaskType
      priority: $Enums.Priority
    }, ExtArgs["result"]["conflictTask"]>
    composites: {}
  }

  type ConflictTaskGetPayload<S extends boolean | null | undefined | ConflictTaskDefaultArgs> = $Result.GetResult<Prisma.$ConflictTaskPayload, S>

  type ConflictTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConflictTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConflictTaskCountAggregateInputType | true
    }

  export interface ConflictTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConflictTask'], meta: { name: 'ConflictTask' } }
    /**
     * Find zero or one ConflictTask that matches the filter.
     * @param {ConflictTaskFindUniqueArgs} args - Arguments to find a ConflictTask
     * @example
     * // Get one ConflictTask
     * const conflictTask = await prisma.conflictTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConflictTaskFindUniqueArgs>(args: SelectSubset<T, ConflictTaskFindUniqueArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConflictTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConflictTaskFindUniqueOrThrowArgs} args - Arguments to find a ConflictTask
     * @example
     * // Get one ConflictTask
     * const conflictTask = await prisma.conflictTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConflictTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, ConflictTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConflictTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskFindFirstArgs} args - Arguments to find a ConflictTask
     * @example
     * // Get one ConflictTask
     * const conflictTask = await prisma.conflictTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConflictTaskFindFirstArgs>(args?: SelectSubset<T, ConflictTaskFindFirstArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConflictTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskFindFirstOrThrowArgs} args - Arguments to find a ConflictTask
     * @example
     * // Get one ConflictTask
     * const conflictTask = await prisma.conflictTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConflictTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, ConflictTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConflictTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConflictTasks
     * const conflictTasks = await prisma.conflictTask.findMany()
     * 
     * // Get first 10 ConflictTasks
     * const conflictTasks = await prisma.conflictTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conflictTaskWithIdOnly = await prisma.conflictTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConflictTaskFindManyArgs>(args?: SelectSubset<T, ConflictTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConflictTask.
     * @param {ConflictTaskCreateArgs} args - Arguments to create a ConflictTask.
     * @example
     * // Create one ConflictTask
     * const ConflictTask = await prisma.conflictTask.create({
     *   data: {
     *     // ... data to create a ConflictTask
     *   }
     * })
     * 
     */
    create<T extends ConflictTaskCreateArgs>(args: SelectSubset<T, ConflictTaskCreateArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConflictTasks.
     * @param {ConflictTaskCreateManyArgs} args - Arguments to create many ConflictTasks.
     * @example
     * // Create many ConflictTasks
     * const conflictTask = await prisma.conflictTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConflictTaskCreateManyArgs>(args?: SelectSubset<T, ConflictTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConflictTasks and returns the data saved in the database.
     * @param {ConflictTaskCreateManyAndReturnArgs} args - Arguments to create many ConflictTasks.
     * @example
     * // Create many ConflictTasks
     * const conflictTask = await prisma.conflictTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConflictTasks and only return the `id`
     * const conflictTaskWithIdOnly = await prisma.conflictTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConflictTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, ConflictTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConflictTask.
     * @param {ConflictTaskDeleteArgs} args - Arguments to delete one ConflictTask.
     * @example
     * // Delete one ConflictTask
     * const ConflictTask = await prisma.conflictTask.delete({
     *   where: {
     *     // ... filter to delete one ConflictTask
     *   }
     * })
     * 
     */
    delete<T extends ConflictTaskDeleteArgs>(args: SelectSubset<T, ConflictTaskDeleteArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConflictTask.
     * @param {ConflictTaskUpdateArgs} args - Arguments to update one ConflictTask.
     * @example
     * // Update one ConflictTask
     * const conflictTask = await prisma.conflictTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConflictTaskUpdateArgs>(args: SelectSubset<T, ConflictTaskUpdateArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConflictTasks.
     * @param {ConflictTaskDeleteManyArgs} args - Arguments to filter ConflictTasks to delete.
     * @example
     * // Delete a few ConflictTasks
     * const { count } = await prisma.conflictTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConflictTaskDeleteManyArgs>(args?: SelectSubset<T, ConflictTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConflictTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConflictTasks
     * const conflictTask = await prisma.conflictTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConflictTaskUpdateManyArgs>(args: SelectSubset<T, ConflictTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConflictTasks and returns the data updated in the database.
     * @param {ConflictTaskUpdateManyAndReturnArgs} args - Arguments to update many ConflictTasks.
     * @example
     * // Update many ConflictTasks
     * const conflictTask = await prisma.conflictTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConflictTasks and only return the `id`
     * const conflictTaskWithIdOnly = await prisma.conflictTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConflictTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, ConflictTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConflictTask.
     * @param {ConflictTaskUpsertArgs} args - Arguments to update or create a ConflictTask.
     * @example
     * // Update or create a ConflictTask
     * const conflictTask = await prisma.conflictTask.upsert({
     *   create: {
     *     // ... data to create a ConflictTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConflictTask we want to update
     *   }
     * })
     */
    upsert<T extends ConflictTaskUpsertArgs>(args: SelectSubset<T, ConflictTaskUpsertArgs<ExtArgs>>): Prisma__ConflictTaskClient<$Result.GetResult<Prisma.$ConflictTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConflictTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskCountArgs} args - Arguments to filter ConflictTasks to count.
     * @example
     * // Count the number of ConflictTasks
     * const count = await prisma.conflictTask.count({
     *   where: {
     *     // ... the filter for the ConflictTasks we want to count
     *   }
     * })
    **/
    count<T extends ConflictTaskCountArgs>(
      args?: Subset<T, ConflictTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConflictTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConflictTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConflictTaskAggregateArgs>(args: Subset<T, ConflictTaskAggregateArgs>): Prisma.PrismaPromise<GetConflictTaskAggregateType<T>>

    /**
     * Group by ConflictTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConflictTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConflictTaskGroupByArgs['orderBy'] }
        : { orderBy?: ConflictTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConflictTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConflictTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConflictTask model
   */
  readonly fields: ConflictTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConflictTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConflictTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conflict<T extends ConflictDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConflictDefaultArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConflictTask model
   */
  interface ConflictTaskFieldRefs {
    readonly id: FieldRef<"ConflictTask", 'String'>
    readonly conflictId: FieldRef<"ConflictTask", 'String'>
    readonly eventId: FieldRef<"ConflictTask", 'String'>
    readonly title: FieldRef<"ConflictTask", 'String'>
    readonly startTime: FieldRef<"ConflictTask", 'DateTime'>
    readonly endTime: FieldRef<"ConflictTask", 'DateTime'>
    readonly displayStart: FieldRef<"ConflictTask", 'Int'>
    readonly displayEnd: FieldRef<"ConflictTask", 'Int'>
    readonly relativeStart: FieldRef<"ConflictTask", 'Int'>
    readonly relativeEnd: FieldRef<"ConflictTask", 'Int'>
    readonly taskType: FieldRef<"ConflictTask", 'TaskType'>
    readonly priority: FieldRef<"ConflictTask", 'Priority'>
  }
    

  // Custom InputTypes
  /**
   * ConflictTask findUnique
   */
  export type ConflictTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter, which ConflictTask to fetch.
     */
    where: ConflictTaskWhereUniqueInput
  }

  /**
   * ConflictTask findUniqueOrThrow
   */
  export type ConflictTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter, which ConflictTask to fetch.
     */
    where: ConflictTaskWhereUniqueInput
  }

  /**
   * ConflictTask findFirst
   */
  export type ConflictTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter, which ConflictTask to fetch.
     */
    where?: ConflictTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictTasks to fetch.
     */
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConflictTasks.
     */
    cursor?: ConflictTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConflictTasks.
     */
    distinct?: ConflictTaskScalarFieldEnum | ConflictTaskScalarFieldEnum[]
  }

  /**
   * ConflictTask findFirstOrThrow
   */
  export type ConflictTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter, which ConflictTask to fetch.
     */
    where?: ConflictTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictTasks to fetch.
     */
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConflictTasks.
     */
    cursor?: ConflictTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConflictTasks.
     */
    distinct?: ConflictTaskScalarFieldEnum | ConflictTaskScalarFieldEnum[]
  }

  /**
   * ConflictTask findMany
   */
  export type ConflictTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter, which ConflictTasks to fetch.
     */
    where?: ConflictTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictTasks to fetch.
     */
    orderBy?: ConflictTaskOrderByWithRelationInput | ConflictTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConflictTasks.
     */
    cursor?: ConflictTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictTasks.
     */
    skip?: number
    distinct?: ConflictTaskScalarFieldEnum | ConflictTaskScalarFieldEnum[]
  }

  /**
   * ConflictTask create
   */
  export type ConflictTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * The data needed to create a ConflictTask.
     */
    data: XOR<ConflictTaskCreateInput, ConflictTaskUncheckedCreateInput>
  }

  /**
   * ConflictTask createMany
   */
  export type ConflictTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConflictTasks.
     */
    data: ConflictTaskCreateManyInput | ConflictTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConflictTask createManyAndReturn
   */
  export type ConflictTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * The data used to create many ConflictTasks.
     */
    data: ConflictTaskCreateManyInput | ConflictTaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConflictTask update
   */
  export type ConflictTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * The data needed to update a ConflictTask.
     */
    data: XOR<ConflictTaskUpdateInput, ConflictTaskUncheckedUpdateInput>
    /**
     * Choose, which ConflictTask to update.
     */
    where: ConflictTaskWhereUniqueInput
  }

  /**
   * ConflictTask updateMany
   */
  export type ConflictTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConflictTasks.
     */
    data: XOR<ConflictTaskUpdateManyMutationInput, ConflictTaskUncheckedUpdateManyInput>
    /**
     * Filter which ConflictTasks to update
     */
    where?: ConflictTaskWhereInput
    /**
     * Limit how many ConflictTasks to update.
     */
    limit?: number
  }

  /**
   * ConflictTask updateManyAndReturn
   */
  export type ConflictTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * The data used to update ConflictTasks.
     */
    data: XOR<ConflictTaskUpdateManyMutationInput, ConflictTaskUncheckedUpdateManyInput>
    /**
     * Filter which ConflictTasks to update
     */
    where?: ConflictTaskWhereInput
    /**
     * Limit how many ConflictTasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConflictTask upsert
   */
  export type ConflictTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * The filter to search for the ConflictTask to update in case it exists.
     */
    where: ConflictTaskWhereUniqueInput
    /**
     * In case the ConflictTask found by the `where` argument doesn't exist, create a new ConflictTask with this data.
     */
    create: XOR<ConflictTaskCreateInput, ConflictTaskUncheckedCreateInput>
    /**
     * In case the ConflictTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConflictTaskUpdateInput, ConflictTaskUncheckedUpdateInput>
  }

  /**
   * ConflictTask delete
   */
  export type ConflictTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
    /**
     * Filter which ConflictTask to delete.
     */
    where: ConflictTaskWhereUniqueInput
  }

  /**
   * ConflictTask deleteMany
   */
  export type ConflictTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConflictTasks to delete
     */
    where?: ConflictTaskWhereInput
    /**
     * Limit how many ConflictTasks to delete.
     */
    limit?: number
  }

  /**
   * ConflictTask without action
   */
  export type ConflictTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictTask
     */
    select?: ConflictTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictTask
     */
    omit?: ConflictTaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictTaskInclude<ExtArgs> | null
  }


  /**
   * Model ConflictProposal
   */

  export type AggregateConflictProposal = {
    _count: ConflictProposalCountAggregateOutputType | null
    _avg: ConflictProposalAvgAggregateOutputType | null
    _sum: ConflictProposalSumAggregateOutputType | null
    _min: ConflictProposalMinAggregateOutputType | null
    _max: ConflictProposalMaxAggregateOutputType | null
  }

  export type ConflictProposalAvgAggregateOutputType = {
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
  }

  export type ConflictProposalSumAggregateOutputType = {
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
  }

  export type ConflictProposalMinAggregateOutputType = {
    id: string | null
    conflictId: string | null
    eventId: string | null
    title: string | null
    proposedStart: Date | null
    proposedEnd: Date | null
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
    taskType: $Enums.TaskType | null
    reasoning: string | null
  }

  export type ConflictProposalMaxAggregateOutputType = {
    id: string | null
    conflictId: string | null
    eventId: string | null
    title: string | null
    proposedStart: Date | null
    proposedEnd: Date | null
    displayStart: number | null
    displayEnd: number | null
    relativeStart: number | null
    relativeEnd: number | null
    taskType: $Enums.TaskType | null
    reasoning: string | null
  }

  export type ConflictProposalCountAggregateOutputType = {
    id: number
    conflictId: number
    eventId: number
    title: number
    proposedStart: number
    proposedEnd: number
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: number
    reasoning: number
    _all: number
  }


  export type ConflictProposalAvgAggregateInputType = {
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
  }

  export type ConflictProposalSumAggregateInputType = {
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
  }

  export type ConflictProposalMinAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    proposedStart?: true
    proposedEnd?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    reasoning?: true
  }

  export type ConflictProposalMaxAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    proposedStart?: true
    proposedEnd?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    reasoning?: true
  }

  export type ConflictProposalCountAggregateInputType = {
    id?: true
    conflictId?: true
    eventId?: true
    title?: true
    proposedStart?: true
    proposedEnd?: true
    displayStart?: true
    displayEnd?: true
    relativeStart?: true
    relativeEnd?: true
    taskType?: true
    reasoning?: true
    _all?: true
  }

  export type ConflictProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConflictProposal to aggregate.
     */
    where?: ConflictProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictProposals to fetch.
     */
    orderBy?: ConflictProposalOrderByWithRelationInput | ConflictProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConflictProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConflictProposals
    **/
    _count?: true | ConflictProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConflictProposalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConflictProposalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConflictProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConflictProposalMaxAggregateInputType
  }

  export type GetConflictProposalAggregateType<T extends ConflictProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateConflictProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConflictProposal[P]>
      : GetScalarType<T[P], AggregateConflictProposal[P]>
  }




  export type ConflictProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConflictProposalWhereInput
    orderBy?: ConflictProposalOrderByWithAggregationInput | ConflictProposalOrderByWithAggregationInput[]
    by: ConflictProposalScalarFieldEnum[] | ConflictProposalScalarFieldEnum
    having?: ConflictProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConflictProposalCountAggregateInputType | true
    _avg?: ConflictProposalAvgAggregateInputType
    _sum?: ConflictProposalSumAggregateInputType
    _min?: ConflictProposalMinAggregateInputType
    _max?: ConflictProposalMaxAggregateInputType
  }

  export type ConflictProposalGroupByOutputType = {
    id: string
    conflictId: string
    eventId: string
    title: string
    proposedStart: Date
    proposedEnd: Date
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
    _count: ConflictProposalCountAggregateOutputType | null
    _avg: ConflictProposalAvgAggregateOutputType | null
    _sum: ConflictProposalSumAggregateOutputType | null
    _min: ConflictProposalMinAggregateOutputType | null
    _max: ConflictProposalMaxAggregateOutputType | null
  }

  type GetConflictProposalGroupByPayload<T extends ConflictProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConflictProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConflictProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConflictProposalGroupByOutputType[P]>
            : GetScalarType<T[P], ConflictProposalGroupByOutputType[P]>
        }
      >
    >


  export type ConflictProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    proposedStart?: boolean
    proposedEnd?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    reasoning?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictProposal"]>

  export type ConflictProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    proposedStart?: boolean
    proposedEnd?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    reasoning?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictProposal"]>

  export type ConflictProposalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    proposedStart?: boolean
    proposedEnd?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    reasoning?: boolean
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conflictProposal"]>

  export type ConflictProposalSelectScalar = {
    id?: boolean
    conflictId?: boolean
    eventId?: boolean
    title?: boolean
    proposedStart?: boolean
    proposedEnd?: boolean
    displayStart?: boolean
    displayEnd?: boolean
    relativeStart?: boolean
    relativeEnd?: boolean
    taskType?: boolean
    reasoning?: boolean
  }

  export type ConflictProposalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conflictId" | "eventId" | "title" | "proposedStart" | "proposedEnd" | "displayStart" | "displayEnd" | "relativeStart" | "relativeEnd" | "taskType" | "reasoning", ExtArgs["result"]["conflictProposal"]>
  export type ConflictProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }
  export type ConflictProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }
  export type ConflictProposalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conflict?: boolean | ConflictDefaultArgs<ExtArgs>
  }

  export type $ConflictProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConflictProposal"
    objects: {
      conflict: Prisma.$ConflictPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conflictId: string
      eventId: string
      title: string
      proposedStart: Date
      proposedEnd: Date
      displayStart: number
      displayEnd: number
      relativeStart: number
      relativeEnd: number
      taskType: $Enums.TaskType
      reasoning: string
    }, ExtArgs["result"]["conflictProposal"]>
    composites: {}
  }

  type ConflictProposalGetPayload<S extends boolean | null | undefined | ConflictProposalDefaultArgs> = $Result.GetResult<Prisma.$ConflictProposalPayload, S>

  type ConflictProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConflictProposalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConflictProposalCountAggregateInputType | true
    }

  export interface ConflictProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConflictProposal'], meta: { name: 'ConflictProposal' } }
    /**
     * Find zero or one ConflictProposal that matches the filter.
     * @param {ConflictProposalFindUniqueArgs} args - Arguments to find a ConflictProposal
     * @example
     * // Get one ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConflictProposalFindUniqueArgs>(args: SelectSubset<T, ConflictProposalFindUniqueArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConflictProposal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConflictProposalFindUniqueOrThrowArgs} args - Arguments to find a ConflictProposal
     * @example
     * // Get one ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConflictProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, ConflictProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConflictProposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalFindFirstArgs} args - Arguments to find a ConflictProposal
     * @example
     * // Get one ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConflictProposalFindFirstArgs>(args?: SelectSubset<T, ConflictProposalFindFirstArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConflictProposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalFindFirstOrThrowArgs} args - Arguments to find a ConflictProposal
     * @example
     * // Get one ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConflictProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, ConflictProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConflictProposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConflictProposals
     * const conflictProposals = await prisma.conflictProposal.findMany()
     * 
     * // Get first 10 ConflictProposals
     * const conflictProposals = await prisma.conflictProposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conflictProposalWithIdOnly = await prisma.conflictProposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConflictProposalFindManyArgs>(args?: SelectSubset<T, ConflictProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConflictProposal.
     * @param {ConflictProposalCreateArgs} args - Arguments to create a ConflictProposal.
     * @example
     * // Create one ConflictProposal
     * const ConflictProposal = await prisma.conflictProposal.create({
     *   data: {
     *     // ... data to create a ConflictProposal
     *   }
     * })
     * 
     */
    create<T extends ConflictProposalCreateArgs>(args: SelectSubset<T, ConflictProposalCreateArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConflictProposals.
     * @param {ConflictProposalCreateManyArgs} args - Arguments to create many ConflictProposals.
     * @example
     * // Create many ConflictProposals
     * const conflictProposal = await prisma.conflictProposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConflictProposalCreateManyArgs>(args?: SelectSubset<T, ConflictProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConflictProposals and returns the data saved in the database.
     * @param {ConflictProposalCreateManyAndReturnArgs} args - Arguments to create many ConflictProposals.
     * @example
     * // Create many ConflictProposals
     * const conflictProposal = await prisma.conflictProposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConflictProposals and only return the `id`
     * const conflictProposalWithIdOnly = await prisma.conflictProposal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConflictProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, ConflictProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConflictProposal.
     * @param {ConflictProposalDeleteArgs} args - Arguments to delete one ConflictProposal.
     * @example
     * // Delete one ConflictProposal
     * const ConflictProposal = await prisma.conflictProposal.delete({
     *   where: {
     *     // ... filter to delete one ConflictProposal
     *   }
     * })
     * 
     */
    delete<T extends ConflictProposalDeleteArgs>(args: SelectSubset<T, ConflictProposalDeleteArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConflictProposal.
     * @param {ConflictProposalUpdateArgs} args - Arguments to update one ConflictProposal.
     * @example
     * // Update one ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConflictProposalUpdateArgs>(args: SelectSubset<T, ConflictProposalUpdateArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConflictProposals.
     * @param {ConflictProposalDeleteManyArgs} args - Arguments to filter ConflictProposals to delete.
     * @example
     * // Delete a few ConflictProposals
     * const { count } = await prisma.conflictProposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConflictProposalDeleteManyArgs>(args?: SelectSubset<T, ConflictProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConflictProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConflictProposals
     * const conflictProposal = await prisma.conflictProposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConflictProposalUpdateManyArgs>(args: SelectSubset<T, ConflictProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConflictProposals and returns the data updated in the database.
     * @param {ConflictProposalUpdateManyAndReturnArgs} args - Arguments to update many ConflictProposals.
     * @example
     * // Update many ConflictProposals
     * const conflictProposal = await prisma.conflictProposal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConflictProposals and only return the `id`
     * const conflictProposalWithIdOnly = await prisma.conflictProposal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConflictProposalUpdateManyAndReturnArgs>(args: SelectSubset<T, ConflictProposalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConflictProposal.
     * @param {ConflictProposalUpsertArgs} args - Arguments to update or create a ConflictProposal.
     * @example
     * // Update or create a ConflictProposal
     * const conflictProposal = await prisma.conflictProposal.upsert({
     *   create: {
     *     // ... data to create a ConflictProposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConflictProposal we want to update
     *   }
     * })
     */
    upsert<T extends ConflictProposalUpsertArgs>(args: SelectSubset<T, ConflictProposalUpsertArgs<ExtArgs>>): Prisma__ConflictProposalClient<$Result.GetResult<Prisma.$ConflictProposalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConflictProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalCountArgs} args - Arguments to filter ConflictProposals to count.
     * @example
     * // Count the number of ConflictProposals
     * const count = await prisma.conflictProposal.count({
     *   where: {
     *     // ... the filter for the ConflictProposals we want to count
     *   }
     * })
    **/
    count<T extends ConflictProposalCountArgs>(
      args?: Subset<T, ConflictProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConflictProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConflictProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConflictProposalAggregateArgs>(args: Subset<T, ConflictProposalAggregateArgs>): Prisma.PrismaPromise<GetConflictProposalAggregateType<T>>

    /**
     * Group by ConflictProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConflictProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConflictProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConflictProposalGroupByArgs['orderBy'] }
        : { orderBy?: ConflictProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConflictProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConflictProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConflictProposal model
   */
  readonly fields: ConflictProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConflictProposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConflictProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conflict<T extends ConflictDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConflictDefaultArgs<ExtArgs>>): Prisma__ConflictClient<$Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConflictProposal model
   */
  interface ConflictProposalFieldRefs {
    readonly id: FieldRef<"ConflictProposal", 'String'>
    readonly conflictId: FieldRef<"ConflictProposal", 'String'>
    readonly eventId: FieldRef<"ConflictProposal", 'String'>
    readonly title: FieldRef<"ConflictProposal", 'String'>
    readonly proposedStart: FieldRef<"ConflictProposal", 'DateTime'>
    readonly proposedEnd: FieldRef<"ConflictProposal", 'DateTime'>
    readonly displayStart: FieldRef<"ConflictProposal", 'Int'>
    readonly displayEnd: FieldRef<"ConflictProposal", 'Int'>
    readonly relativeStart: FieldRef<"ConflictProposal", 'Int'>
    readonly relativeEnd: FieldRef<"ConflictProposal", 'Int'>
    readonly taskType: FieldRef<"ConflictProposal", 'TaskType'>
    readonly reasoning: FieldRef<"ConflictProposal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConflictProposal findUnique
   */
  export type ConflictProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter, which ConflictProposal to fetch.
     */
    where: ConflictProposalWhereUniqueInput
  }

  /**
   * ConflictProposal findUniqueOrThrow
   */
  export type ConflictProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter, which ConflictProposal to fetch.
     */
    where: ConflictProposalWhereUniqueInput
  }

  /**
   * ConflictProposal findFirst
   */
  export type ConflictProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter, which ConflictProposal to fetch.
     */
    where?: ConflictProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictProposals to fetch.
     */
    orderBy?: ConflictProposalOrderByWithRelationInput | ConflictProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConflictProposals.
     */
    cursor?: ConflictProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConflictProposals.
     */
    distinct?: ConflictProposalScalarFieldEnum | ConflictProposalScalarFieldEnum[]
  }

  /**
   * ConflictProposal findFirstOrThrow
   */
  export type ConflictProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter, which ConflictProposal to fetch.
     */
    where?: ConflictProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictProposals to fetch.
     */
    orderBy?: ConflictProposalOrderByWithRelationInput | ConflictProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConflictProposals.
     */
    cursor?: ConflictProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConflictProposals.
     */
    distinct?: ConflictProposalScalarFieldEnum | ConflictProposalScalarFieldEnum[]
  }

  /**
   * ConflictProposal findMany
   */
  export type ConflictProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter, which ConflictProposals to fetch.
     */
    where?: ConflictProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConflictProposals to fetch.
     */
    orderBy?: ConflictProposalOrderByWithRelationInput | ConflictProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConflictProposals.
     */
    cursor?: ConflictProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConflictProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConflictProposals.
     */
    skip?: number
    distinct?: ConflictProposalScalarFieldEnum | ConflictProposalScalarFieldEnum[]
  }

  /**
   * ConflictProposal create
   */
  export type ConflictProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a ConflictProposal.
     */
    data: XOR<ConflictProposalCreateInput, ConflictProposalUncheckedCreateInput>
  }

  /**
   * ConflictProposal createMany
   */
  export type ConflictProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConflictProposals.
     */
    data: ConflictProposalCreateManyInput | ConflictProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConflictProposal createManyAndReturn
   */
  export type ConflictProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * The data used to create many ConflictProposals.
     */
    data: ConflictProposalCreateManyInput | ConflictProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConflictProposal update
   */
  export type ConflictProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a ConflictProposal.
     */
    data: XOR<ConflictProposalUpdateInput, ConflictProposalUncheckedUpdateInput>
    /**
     * Choose, which ConflictProposal to update.
     */
    where: ConflictProposalWhereUniqueInput
  }

  /**
   * ConflictProposal updateMany
   */
  export type ConflictProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConflictProposals.
     */
    data: XOR<ConflictProposalUpdateManyMutationInput, ConflictProposalUncheckedUpdateManyInput>
    /**
     * Filter which ConflictProposals to update
     */
    where?: ConflictProposalWhereInput
    /**
     * Limit how many ConflictProposals to update.
     */
    limit?: number
  }

  /**
   * ConflictProposal updateManyAndReturn
   */
  export type ConflictProposalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * The data used to update ConflictProposals.
     */
    data: XOR<ConflictProposalUpdateManyMutationInput, ConflictProposalUncheckedUpdateManyInput>
    /**
     * Filter which ConflictProposals to update
     */
    where?: ConflictProposalWhereInput
    /**
     * Limit how many ConflictProposals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConflictProposal upsert
   */
  export type ConflictProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the ConflictProposal to update in case it exists.
     */
    where: ConflictProposalWhereUniqueInput
    /**
     * In case the ConflictProposal found by the `where` argument doesn't exist, create a new ConflictProposal with this data.
     */
    create: XOR<ConflictProposalCreateInput, ConflictProposalUncheckedCreateInput>
    /**
     * In case the ConflictProposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConflictProposalUpdateInput, ConflictProposalUncheckedUpdateInput>
  }

  /**
   * ConflictProposal delete
   */
  export type ConflictProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
    /**
     * Filter which ConflictProposal to delete.
     */
    where: ConflictProposalWhereUniqueInput
  }

  /**
   * ConflictProposal deleteMany
   */
  export type ConflictProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConflictProposals to delete
     */
    where?: ConflictProposalWhereInput
    /**
     * Limit how many ConflictProposals to delete.
     */
    limit?: number
  }

  /**
   * ConflictProposal without action
   */
  export type ConflictProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConflictProposal
     */
    select?: ConflictProposalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConflictProposal
     */
    omit?: ConflictProposalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConflictProposalInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    completed: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    completed: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    completed: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    completed?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    completed?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    completed?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string | null
    completed: boolean
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    completed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    completed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    completed?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    completed?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "completed", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string | null
      completed: boolean
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly completed: FieldRef<"Task", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model MoodLog
   */

  export type AggregateMoodLog = {
    _count: MoodLogCountAggregateOutputType | null
    _min: MoodLogMinAggregateOutputType | null
    _max: MoodLogMaxAggregateOutputType | null
  }

  export type MoodLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    mood: string | null
    createdAt: Date | null
  }

  export type MoodLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    mood: string | null
    createdAt: Date | null
  }

  export type MoodLogCountAggregateOutputType = {
    id: number
    userId: number
    mood: number
    createdAt: number
    _all: number
  }


  export type MoodLogMinAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    createdAt?: true
  }

  export type MoodLogMaxAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    createdAt?: true
  }

  export type MoodLogCountAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    createdAt?: true
    _all?: true
  }

  export type MoodLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodLog to aggregate.
     */
    where?: MoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodLogs to fetch.
     */
    orderBy?: MoodLogOrderByWithRelationInput | MoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoodLogs
    **/
    _count?: true | MoodLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodLogMaxAggregateInputType
  }

  export type GetMoodLogAggregateType<T extends MoodLogAggregateArgs> = {
        [P in keyof T & keyof AggregateMoodLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoodLog[P]>
      : GetScalarType<T[P], AggregateMoodLog[P]>
  }




  export type MoodLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodLogWhereInput
    orderBy?: MoodLogOrderByWithAggregationInput | MoodLogOrderByWithAggregationInput[]
    by: MoodLogScalarFieldEnum[] | MoodLogScalarFieldEnum
    having?: MoodLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodLogCountAggregateInputType | true
    _min?: MoodLogMinAggregateInputType
    _max?: MoodLogMaxAggregateInputType
  }

  export type MoodLogGroupByOutputType = {
    id: string
    userId: string
    mood: string
    createdAt: Date
    _count: MoodLogCountAggregateOutputType | null
    _min: MoodLogMinAggregateOutputType | null
    _max: MoodLogMaxAggregateOutputType | null
  }

  type GetMoodLogGroupByPayload<T extends MoodLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodLogGroupByOutputType[P]>
            : GetScalarType<T[P], MoodLogGroupByOutputType[P]>
        }
      >
    >


  export type MoodLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodLog"]>

  export type MoodLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodLog"]>

  export type MoodLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodLog"]>

  export type MoodLogSelectScalar = {
    id?: boolean
    userId?: boolean
    mood?: boolean
    createdAt?: boolean
  }

  export type MoodLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "mood" | "createdAt", ExtArgs["result"]["moodLog"]>
  export type MoodLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MoodLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoodLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      mood: string
      createdAt: Date
    }, ExtArgs["result"]["moodLog"]>
    composites: {}
  }

  type MoodLogGetPayload<S extends boolean | null | undefined | MoodLogDefaultArgs> = $Result.GetResult<Prisma.$MoodLogPayload, S>

  type MoodLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodLogCountAggregateInputType | true
    }

  export interface MoodLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoodLog'], meta: { name: 'MoodLog' } }
    /**
     * Find zero or one MoodLog that matches the filter.
     * @param {MoodLogFindUniqueArgs} args - Arguments to find a MoodLog
     * @example
     * // Get one MoodLog
     * const moodLog = await prisma.moodLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodLogFindUniqueArgs>(args: SelectSubset<T, MoodLogFindUniqueArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MoodLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodLogFindUniqueOrThrowArgs} args - Arguments to find a MoodLog
     * @example
     * // Get one MoodLog
     * const moodLog = await prisma.moodLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodLogFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogFindFirstArgs} args - Arguments to find a MoodLog
     * @example
     * // Get one MoodLog
     * const moodLog = await prisma.moodLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodLogFindFirstArgs>(args?: SelectSubset<T, MoodLogFindFirstArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogFindFirstOrThrowArgs} args - Arguments to find a MoodLog
     * @example
     * // Get one MoodLog
     * const moodLog = await prisma.moodLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodLogFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MoodLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoodLogs
     * const moodLogs = await prisma.moodLog.findMany()
     * 
     * // Get first 10 MoodLogs
     * const moodLogs = await prisma.moodLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodLogWithIdOnly = await prisma.moodLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodLogFindManyArgs>(args?: SelectSubset<T, MoodLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MoodLog.
     * @param {MoodLogCreateArgs} args - Arguments to create a MoodLog.
     * @example
     * // Create one MoodLog
     * const MoodLog = await prisma.moodLog.create({
     *   data: {
     *     // ... data to create a MoodLog
     *   }
     * })
     * 
     */
    create<T extends MoodLogCreateArgs>(args: SelectSubset<T, MoodLogCreateArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MoodLogs.
     * @param {MoodLogCreateManyArgs} args - Arguments to create many MoodLogs.
     * @example
     * // Create many MoodLogs
     * const moodLog = await prisma.moodLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodLogCreateManyArgs>(args?: SelectSubset<T, MoodLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoodLogs and returns the data saved in the database.
     * @param {MoodLogCreateManyAndReturnArgs} args - Arguments to create many MoodLogs.
     * @example
     * // Create many MoodLogs
     * const moodLog = await prisma.moodLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoodLogs and only return the `id`
     * const moodLogWithIdOnly = await prisma.moodLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodLogCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MoodLog.
     * @param {MoodLogDeleteArgs} args - Arguments to delete one MoodLog.
     * @example
     * // Delete one MoodLog
     * const MoodLog = await prisma.moodLog.delete({
     *   where: {
     *     // ... filter to delete one MoodLog
     *   }
     * })
     * 
     */
    delete<T extends MoodLogDeleteArgs>(args: SelectSubset<T, MoodLogDeleteArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MoodLog.
     * @param {MoodLogUpdateArgs} args - Arguments to update one MoodLog.
     * @example
     * // Update one MoodLog
     * const moodLog = await prisma.moodLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodLogUpdateArgs>(args: SelectSubset<T, MoodLogUpdateArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MoodLogs.
     * @param {MoodLogDeleteManyArgs} args - Arguments to filter MoodLogs to delete.
     * @example
     * // Delete a few MoodLogs
     * const { count } = await prisma.moodLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodLogDeleteManyArgs>(args?: SelectSubset<T, MoodLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoodLogs
     * const moodLog = await prisma.moodLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodLogUpdateManyArgs>(args: SelectSubset<T, MoodLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodLogs and returns the data updated in the database.
     * @param {MoodLogUpdateManyAndReturnArgs} args - Arguments to update many MoodLogs.
     * @example
     * // Update many MoodLogs
     * const moodLog = await prisma.moodLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MoodLogs and only return the `id`
     * const moodLogWithIdOnly = await prisma.moodLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodLogUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MoodLog.
     * @param {MoodLogUpsertArgs} args - Arguments to update or create a MoodLog.
     * @example
     * // Update or create a MoodLog
     * const moodLog = await prisma.moodLog.upsert({
     *   create: {
     *     // ... data to create a MoodLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoodLog we want to update
     *   }
     * })
     */
    upsert<T extends MoodLogUpsertArgs>(args: SelectSubset<T, MoodLogUpsertArgs<ExtArgs>>): Prisma__MoodLogClient<$Result.GetResult<Prisma.$MoodLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MoodLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogCountArgs} args - Arguments to filter MoodLogs to count.
     * @example
     * // Count the number of MoodLogs
     * const count = await prisma.moodLog.count({
     *   where: {
     *     // ... the filter for the MoodLogs we want to count
     *   }
     * })
    **/
    count<T extends MoodLogCountArgs>(
      args?: Subset<T, MoodLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodLogAggregateArgs>(args: Subset<T, MoodLogAggregateArgs>): Prisma.PrismaPromise<GetMoodLogAggregateType<T>>

    /**
     * Group by MoodLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodLogGroupByArgs['orderBy'] }
        : { orderBy?: MoodLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoodLog model
   */
  readonly fields: MoodLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoodLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoodLog model
   */
  interface MoodLogFieldRefs {
    readonly id: FieldRef<"MoodLog", 'String'>
    readonly userId: FieldRef<"MoodLog", 'String'>
    readonly mood: FieldRef<"MoodLog", 'String'>
    readonly createdAt: FieldRef<"MoodLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MoodLog findUnique
   */
  export type MoodLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter, which MoodLog to fetch.
     */
    where: MoodLogWhereUniqueInput
  }

  /**
   * MoodLog findUniqueOrThrow
   */
  export type MoodLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter, which MoodLog to fetch.
     */
    where: MoodLogWhereUniqueInput
  }

  /**
   * MoodLog findFirst
   */
  export type MoodLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter, which MoodLog to fetch.
     */
    where?: MoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodLogs to fetch.
     */
    orderBy?: MoodLogOrderByWithRelationInput | MoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodLogs.
     */
    cursor?: MoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodLogs.
     */
    distinct?: MoodLogScalarFieldEnum | MoodLogScalarFieldEnum[]
  }

  /**
   * MoodLog findFirstOrThrow
   */
  export type MoodLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter, which MoodLog to fetch.
     */
    where?: MoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodLogs to fetch.
     */
    orderBy?: MoodLogOrderByWithRelationInput | MoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodLogs.
     */
    cursor?: MoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodLogs.
     */
    distinct?: MoodLogScalarFieldEnum | MoodLogScalarFieldEnum[]
  }

  /**
   * MoodLog findMany
   */
  export type MoodLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter, which MoodLogs to fetch.
     */
    where?: MoodLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodLogs to fetch.
     */
    orderBy?: MoodLogOrderByWithRelationInput | MoodLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoodLogs.
     */
    cursor?: MoodLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodLogs.
     */
    skip?: number
    distinct?: MoodLogScalarFieldEnum | MoodLogScalarFieldEnum[]
  }

  /**
   * MoodLog create
   */
  export type MoodLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * The data needed to create a MoodLog.
     */
    data: XOR<MoodLogCreateInput, MoodLogUncheckedCreateInput>
  }

  /**
   * MoodLog createMany
   */
  export type MoodLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoodLogs.
     */
    data: MoodLogCreateManyInput | MoodLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoodLog createManyAndReturn
   */
  export type MoodLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * The data used to create many MoodLogs.
     */
    data: MoodLogCreateManyInput | MoodLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodLog update
   */
  export type MoodLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * The data needed to update a MoodLog.
     */
    data: XOR<MoodLogUpdateInput, MoodLogUncheckedUpdateInput>
    /**
     * Choose, which MoodLog to update.
     */
    where: MoodLogWhereUniqueInput
  }

  /**
   * MoodLog updateMany
   */
  export type MoodLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoodLogs.
     */
    data: XOR<MoodLogUpdateManyMutationInput, MoodLogUncheckedUpdateManyInput>
    /**
     * Filter which MoodLogs to update
     */
    where?: MoodLogWhereInput
    /**
     * Limit how many MoodLogs to update.
     */
    limit?: number
  }

  /**
   * MoodLog updateManyAndReturn
   */
  export type MoodLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * The data used to update MoodLogs.
     */
    data: XOR<MoodLogUpdateManyMutationInput, MoodLogUncheckedUpdateManyInput>
    /**
     * Filter which MoodLogs to update
     */
    where?: MoodLogWhereInput
    /**
     * Limit how many MoodLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodLog upsert
   */
  export type MoodLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * The filter to search for the MoodLog to update in case it exists.
     */
    where: MoodLogWhereUniqueInput
    /**
     * In case the MoodLog found by the `where` argument doesn't exist, create a new MoodLog with this data.
     */
    create: XOR<MoodLogCreateInput, MoodLogUncheckedCreateInput>
    /**
     * In case the MoodLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodLogUpdateInput, MoodLogUncheckedUpdateInput>
  }

  /**
   * MoodLog delete
   */
  export type MoodLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
    /**
     * Filter which MoodLog to delete.
     */
    where: MoodLogWhereUniqueInput
  }

  /**
   * MoodLog deleteMany
   */
  export type MoodLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodLogs to delete
     */
    where?: MoodLogWhereInput
    /**
     * Limit how many MoodLogs to delete.
     */
    limit?: number
  }

  /**
   * MoodLog without action
   */
  export type MoodLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodLog
     */
    select?: MoodLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodLog
     */
    omit?: MoodLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodLogInclude<ExtArgs> | null
  }


  /**
   * Model SleepLog
   */

  export type AggregateSleepLog = {
    _count: SleepLogCountAggregateOutputType | null
    _min: SleepLogMinAggregateOutputType | null
    _max: SleepLogMaxAggregateOutputType | null
  }

  export type SleepLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sleepTime: string | null
    wakeTime: string | null
  }

  export type SleepLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sleepTime: string | null
    wakeTime: string | null
  }

  export type SleepLogCountAggregateOutputType = {
    id: number
    userId: number
    sleepTime: number
    wakeTime: number
    _all: number
  }


  export type SleepLogMinAggregateInputType = {
    id?: true
    userId?: true
    sleepTime?: true
    wakeTime?: true
  }

  export type SleepLogMaxAggregateInputType = {
    id?: true
    userId?: true
    sleepTime?: true
    wakeTime?: true
  }

  export type SleepLogCountAggregateInputType = {
    id?: true
    userId?: true
    sleepTime?: true
    wakeTime?: true
    _all?: true
  }

  export type SleepLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SleepLog to aggregate.
     */
    where?: SleepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepLogs to fetch.
     */
    orderBy?: SleepLogOrderByWithRelationInput | SleepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SleepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SleepLogs
    **/
    _count?: true | SleepLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SleepLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SleepLogMaxAggregateInputType
  }

  export type GetSleepLogAggregateType<T extends SleepLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSleepLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSleepLog[P]>
      : GetScalarType<T[P], AggregateSleepLog[P]>
  }




  export type SleepLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SleepLogWhereInput
    orderBy?: SleepLogOrderByWithAggregationInput | SleepLogOrderByWithAggregationInput[]
    by: SleepLogScalarFieldEnum[] | SleepLogScalarFieldEnum
    having?: SleepLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SleepLogCountAggregateInputType | true
    _min?: SleepLogMinAggregateInputType
    _max?: SleepLogMaxAggregateInputType
  }

  export type SleepLogGroupByOutputType = {
    id: string
    userId: string
    sleepTime: string
    wakeTime: string
    _count: SleepLogCountAggregateOutputType | null
    _min: SleepLogMinAggregateOutputType | null
    _max: SleepLogMaxAggregateOutputType | null
  }

  type GetSleepLogGroupByPayload<T extends SleepLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SleepLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SleepLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SleepLogGroupByOutputType[P]>
            : GetScalarType<T[P], SleepLogGroupByOutputType[P]>
        }
      >
    >


  export type SleepLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sleepTime?: boolean
    wakeTime?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepLog"]>

  export type SleepLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sleepTime?: boolean
    wakeTime?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepLog"]>

  export type SleepLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sleepTime?: boolean
    wakeTime?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sleepLog"]>

  export type SleepLogSelectScalar = {
    id?: boolean
    userId?: boolean
    sleepTime?: boolean
    wakeTime?: boolean
  }

  export type SleepLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sleepTime" | "wakeTime", ExtArgs["result"]["sleepLog"]>
  export type SleepLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SleepLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SleepLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SleepLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SleepLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      sleepTime: string
      wakeTime: string
    }, ExtArgs["result"]["sleepLog"]>
    composites: {}
  }

  type SleepLogGetPayload<S extends boolean | null | undefined | SleepLogDefaultArgs> = $Result.GetResult<Prisma.$SleepLogPayload, S>

  type SleepLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SleepLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SleepLogCountAggregateInputType | true
    }

  export interface SleepLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SleepLog'], meta: { name: 'SleepLog' } }
    /**
     * Find zero or one SleepLog that matches the filter.
     * @param {SleepLogFindUniqueArgs} args - Arguments to find a SleepLog
     * @example
     * // Get one SleepLog
     * const sleepLog = await prisma.sleepLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SleepLogFindUniqueArgs>(args: SelectSubset<T, SleepLogFindUniqueArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SleepLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SleepLogFindUniqueOrThrowArgs} args - Arguments to find a SleepLog
     * @example
     * // Get one SleepLog
     * const sleepLog = await prisma.sleepLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SleepLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SleepLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SleepLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogFindFirstArgs} args - Arguments to find a SleepLog
     * @example
     * // Get one SleepLog
     * const sleepLog = await prisma.sleepLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SleepLogFindFirstArgs>(args?: SelectSubset<T, SleepLogFindFirstArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SleepLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogFindFirstOrThrowArgs} args - Arguments to find a SleepLog
     * @example
     * // Get one SleepLog
     * const sleepLog = await prisma.sleepLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SleepLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SleepLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SleepLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SleepLogs
     * const sleepLogs = await prisma.sleepLog.findMany()
     * 
     * // Get first 10 SleepLogs
     * const sleepLogs = await prisma.sleepLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sleepLogWithIdOnly = await prisma.sleepLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SleepLogFindManyArgs>(args?: SelectSubset<T, SleepLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SleepLog.
     * @param {SleepLogCreateArgs} args - Arguments to create a SleepLog.
     * @example
     * // Create one SleepLog
     * const SleepLog = await prisma.sleepLog.create({
     *   data: {
     *     // ... data to create a SleepLog
     *   }
     * })
     * 
     */
    create<T extends SleepLogCreateArgs>(args: SelectSubset<T, SleepLogCreateArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SleepLogs.
     * @param {SleepLogCreateManyArgs} args - Arguments to create many SleepLogs.
     * @example
     * // Create many SleepLogs
     * const sleepLog = await prisma.sleepLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SleepLogCreateManyArgs>(args?: SelectSubset<T, SleepLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SleepLogs and returns the data saved in the database.
     * @param {SleepLogCreateManyAndReturnArgs} args - Arguments to create many SleepLogs.
     * @example
     * // Create many SleepLogs
     * const sleepLog = await prisma.sleepLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SleepLogs and only return the `id`
     * const sleepLogWithIdOnly = await prisma.sleepLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SleepLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SleepLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SleepLog.
     * @param {SleepLogDeleteArgs} args - Arguments to delete one SleepLog.
     * @example
     * // Delete one SleepLog
     * const SleepLog = await prisma.sleepLog.delete({
     *   where: {
     *     // ... filter to delete one SleepLog
     *   }
     * })
     * 
     */
    delete<T extends SleepLogDeleteArgs>(args: SelectSubset<T, SleepLogDeleteArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SleepLog.
     * @param {SleepLogUpdateArgs} args - Arguments to update one SleepLog.
     * @example
     * // Update one SleepLog
     * const sleepLog = await prisma.sleepLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SleepLogUpdateArgs>(args: SelectSubset<T, SleepLogUpdateArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SleepLogs.
     * @param {SleepLogDeleteManyArgs} args - Arguments to filter SleepLogs to delete.
     * @example
     * // Delete a few SleepLogs
     * const { count } = await prisma.sleepLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SleepLogDeleteManyArgs>(args?: SelectSubset<T, SleepLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SleepLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SleepLogs
     * const sleepLog = await prisma.sleepLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SleepLogUpdateManyArgs>(args: SelectSubset<T, SleepLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SleepLogs and returns the data updated in the database.
     * @param {SleepLogUpdateManyAndReturnArgs} args - Arguments to update many SleepLogs.
     * @example
     * // Update many SleepLogs
     * const sleepLog = await prisma.sleepLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SleepLogs and only return the `id`
     * const sleepLogWithIdOnly = await prisma.sleepLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SleepLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SleepLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SleepLog.
     * @param {SleepLogUpsertArgs} args - Arguments to update or create a SleepLog.
     * @example
     * // Update or create a SleepLog
     * const sleepLog = await prisma.sleepLog.upsert({
     *   create: {
     *     // ... data to create a SleepLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SleepLog we want to update
     *   }
     * })
     */
    upsert<T extends SleepLogUpsertArgs>(args: SelectSubset<T, SleepLogUpsertArgs<ExtArgs>>): Prisma__SleepLogClient<$Result.GetResult<Prisma.$SleepLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SleepLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogCountArgs} args - Arguments to filter SleepLogs to count.
     * @example
     * // Count the number of SleepLogs
     * const count = await prisma.sleepLog.count({
     *   where: {
     *     // ... the filter for the SleepLogs we want to count
     *   }
     * })
    **/
    count<T extends SleepLogCountArgs>(
      args?: Subset<T, SleepLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SleepLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SleepLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SleepLogAggregateArgs>(args: Subset<T, SleepLogAggregateArgs>): Prisma.PrismaPromise<GetSleepLogAggregateType<T>>

    /**
     * Group by SleepLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SleepLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SleepLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SleepLogGroupByArgs['orderBy'] }
        : { orderBy?: SleepLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SleepLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSleepLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SleepLog model
   */
  readonly fields: SleepLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SleepLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SleepLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SleepLog model
   */
  interface SleepLogFieldRefs {
    readonly id: FieldRef<"SleepLog", 'String'>
    readonly userId: FieldRef<"SleepLog", 'String'>
    readonly sleepTime: FieldRef<"SleepLog", 'String'>
    readonly wakeTime: FieldRef<"SleepLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SleepLog findUnique
   */
  export type SleepLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter, which SleepLog to fetch.
     */
    where: SleepLogWhereUniqueInput
  }

  /**
   * SleepLog findUniqueOrThrow
   */
  export type SleepLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter, which SleepLog to fetch.
     */
    where: SleepLogWhereUniqueInput
  }

  /**
   * SleepLog findFirst
   */
  export type SleepLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter, which SleepLog to fetch.
     */
    where?: SleepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepLogs to fetch.
     */
    orderBy?: SleepLogOrderByWithRelationInput | SleepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SleepLogs.
     */
    cursor?: SleepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SleepLogs.
     */
    distinct?: SleepLogScalarFieldEnum | SleepLogScalarFieldEnum[]
  }

  /**
   * SleepLog findFirstOrThrow
   */
  export type SleepLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter, which SleepLog to fetch.
     */
    where?: SleepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepLogs to fetch.
     */
    orderBy?: SleepLogOrderByWithRelationInput | SleepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SleepLogs.
     */
    cursor?: SleepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SleepLogs.
     */
    distinct?: SleepLogScalarFieldEnum | SleepLogScalarFieldEnum[]
  }

  /**
   * SleepLog findMany
   */
  export type SleepLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter, which SleepLogs to fetch.
     */
    where?: SleepLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SleepLogs to fetch.
     */
    orderBy?: SleepLogOrderByWithRelationInput | SleepLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SleepLogs.
     */
    cursor?: SleepLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SleepLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SleepLogs.
     */
    skip?: number
    distinct?: SleepLogScalarFieldEnum | SleepLogScalarFieldEnum[]
  }

  /**
   * SleepLog create
   */
  export type SleepLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * The data needed to create a SleepLog.
     */
    data: XOR<SleepLogCreateInput, SleepLogUncheckedCreateInput>
  }

  /**
   * SleepLog createMany
   */
  export type SleepLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SleepLogs.
     */
    data: SleepLogCreateManyInput | SleepLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SleepLog createManyAndReturn
   */
  export type SleepLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * The data used to create many SleepLogs.
     */
    data: SleepLogCreateManyInput | SleepLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SleepLog update
   */
  export type SleepLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * The data needed to update a SleepLog.
     */
    data: XOR<SleepLogUpdateInput, SleepLogUncheckedUpdateInput>
    /**
     * Choose, which SleepLog to update.
     */
    where: SleepLogWhereUniqueInput
  }

  /**
   * SleepLog updateMany
   */
  export type SleepLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SleepLogs.
     */
    data: XOR<SleepLogUpdateManyMutationInput, SleepLogUncheckedUpdateManyInput>
    /**
     * Filter which SleepLogs to update
     */
    where?: SleepLogWhereInput
    /**
     * Limit how many SleepLogs to update.
     */
    limit?: number
  }

  /**
   * SleepLog updateManyAndReturn
   */
  export type SleepLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * The data used to update SleepLogs.
     */
    data: XOR<SleepLogUpdateManyMutationInput, SleepLogUncheckedUpdateManyInput>
    /**
     * Filter which SleepLogs to update
     */
    where?: SleepLogWhereInput
    /**
     * Limit how many SleepLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SleepLog upsert
   */
  export type SleepLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * The filter to search for the SleepLog to update in case it exists.
     */
    where: SleepLogWhereUniqueInput
    /**
     * In case the SleepLog found by the `where` argument doesn't exist, create a new SleepLog with this data.
     */
    create: XOR<SleepLogCreateInput, SleepLogUncheckedCreateInput>
    /**
     * In case the SleepLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SleepLogUpdateInput, SleepLogUncheckedUpdateInput>
  }

  /**
   * SleepLog delete
   */
  export type SleepLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
    /**
     * Filter which SleepLog to delete.
     */
    where: SleepLogWhereUniqueInput
  }

  /**
   * SleepLog deleteMany
   */
  export type SleepLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SleepLogs to delete
     */
    where?: SleepLogWhereInput
    /**
     * Limit how many SleepLogs to delete.
     */
    limit?: number
  }

  /**
   * SleepLog without action
   */
  export type SleepLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SleepLog
     */
    select?: SleepLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SleepLog
     */
    omit?: SleepLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SleepLogInclude<ExtArgs> | null
  }


  /**
   * Model BehaviorSummary
   */

  export type AggregateBehaviorSummary = {
    _count: BehaviorSummaryCountAggregateOutputType | null
    _min: BehaviorSummaryMinAggregateOutputType | null
    _max: BehaviorSummaryMaxAggregateOutputType | null
  }

  export type BehaviorSummaryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    updatedAt: Date | null
  }

  export type BehaviorSummaryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    updatedAt: Date | null
  }

  export type BehaviorSummaryCountAggregateOutputType = {
    id: number
    userId: number
    summary: number
    updatedAt: number
    _all: number
  }


  export type BehaviorSummaryMinAggregateInputType = {
    id?: true
    userId?: true
    updatedAt?: true
  }

  export type BehaviorSummaryMaxAggregateInputType = {
    id?: true
    userId?: true
    updatedAt?: true
  }

  export type BehaviorSummaryCountAggregateInputType = {
    id?: true
    userId?: true
    summary?: true
    updatedAt?: true
    _all?: true
  }

  export type BehaviorSummaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BehaviorSummary to aggregate.
     */
    where?: BehaviorSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BehaviorSummaries to fetch.
     */
    orderBy?: BehaviorSummaryOrderByWithRelationInput | BehaviorSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BehaviorSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BehaviorSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BehaviorSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BehaviorSummaries
    **/
    _count?: true | BehaviorSummaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BehaviorSummaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BehaviorSummaryMaxAggregateInputType
  }

  export type GetBehaviorSummaryAggregateType<T extends BehaviorSummaryAggregateArgs> = {
        [P in keyof T & keyof AggregateBehaviorSummary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBehaviorSummary[P]>
      : GetScalarType<T[P], AggregateBehaviorSummary[P]>
  }




  export type BehaviorSummaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BehaviorSummaryWhereInput
    orderBy?: BehaviorSummaryOrderByWithAggregationInput | BehaviorSummaryOrderByWithAggregationInput[]
    by: BehaviorSummaryScalarFieldEnum[] | BehaviorSummaryScalarFieldEnum
    having?: BehaviorSummaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BehaviorSummaryCountAggregateInputType | true
    _min?: BehaviorSummaryMinAggregateInputType
    _max?: BehaviorSummaryMaxAggregateInputType
  }

  export type BehaviorSummaryGroupByOutputType = {
    id: string
    userId: string
    summary: JsonValue
    updatedAt: Date
    _count: BehaviorSummaryCountAggregateOutputType | null
    _min: BehaviorSummaryMinAggregateOutputType | null
    _max: BehaviorSummaryMaxAggregateOutputType | null
  }

  type GetBehaviorSummaryGroupByPayload<T extends BehaviorSummaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BehaviorSummaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BehaviorSummaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BehaviorSummaryGroupByOutputType[P]>
            : GetScalarType<T[P], BehaviorSummaryGroupByOutputType[P]>
        }
      >
    >


  export type BehaviorSummarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    summary?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["behaviorSummary"]>

  export type BehaviorSummarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    summary?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["behaviorSummary"]>

  export type BehaviorSummarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    summary?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["behaviorSummary"]>

  export type BehaviorSummarySelectScalar = {
    id?: boolean
    userId?: boolean
    summary?: boolean
    updatedAt?: boolean
  }

  export type BehaviorSummaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "summary" | "updatedAt", ExtArgs["result"]["behaviorSummary"]>
  export type BehaviorSummaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BehaviorSummaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BehaviorSummaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BehaviorSummaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BehaviorSummary"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      summary: Prisma.JsonValue
      updatedAt: Date
    }, ExtArgs["result"]["behaviorSummary"]>
    composites: {}
  }

  type BehaviorSummaryGetPayload<S extends boolean | null | undefined | BehaviorSummaryDefaultArgs> = $Result.GetResult<Prisma.$BehaviorSummaryPayload, S>

  type BehaviorSummaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BehaviorSummaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BehaviorSummaryCountAggregateInputType | true
    }

  export interface BehaviorSummaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BehaviorSummary'], meta: { name: 'BehaviorSummary' } }
    /**
     * Find zero or one BehaviorSummary that matches the filter.
     * @param {BehaviorSummaryFindUniqueArgs} args - Arguments to find a BehaviorSummary
     * @example
     * // Get one BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BehaviorSummaryFindUniqueArgs>(args: SelectSubset<T, BehaviorSummaryFindUniqueArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BehaviorSummary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BehaviorSummaryFindUniqueOrThrowArgs} args - Arguments to find a BehaviorSummary
     * @example
     * // Get one BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BehaviorSummaryFindUniqueOrThrowArgs>(args: SelectSubset<T, BehaviorSummaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BehaviorSummary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryFindFirstArgs} args - Arguments to find a BehaviorSummary
     * @example
     * // Get one BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BehaviorSummaryFindFirstArgs>(args?: SelectSubset<T, BehaviorSummaryFindFirstArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BehaviorSummary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryFindFirstOrThrowArgs} args - Arguments to find a BehaviorSummary
     * @example
     * // Get one BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BehaviorSummaryFindFirstOrThrowArgs>(args?: SelectSubset<T, BehaviorSummaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BehaviorSummaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BehaviorSummaries
     * const behaviorSummaries = await prisma.behaviorSummary.findMany()
     * 
     * // Get first 10 BehaviorSummaries
     * const behaviorSummaries = await prisma.behaviorSummary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const behaviorSummaryWithIdOnly = await prisma.behaviorSummary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BehaviorSummaryFindManyArgs>(args?: SelectSubset<T, BehaviorSummaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BehaviorSummary.
     * @param {BehaviorSummaryCreateArgs} args - Arguments to create a BehaviorSummary.
     * @example
     * // Create one BehaviorSummary
     * const BehaviorSummary = await prisma.behaviorSummary.create({
     *   data: {
     *     // ... data to create a BehaviorSummary
     *   }
     * })
     * 
     */
    create<T extends BehaviorSummaryCreateArgs>(args: SelectSubset<T, BehaviorSummaryCreateArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BehaviorSummaries.
     * @param {BehaviorSummaryCreateManyArgs} args - Arguments to create many BehaviorSummaries.
     * @example
     * // Create many BehaviorSummaries
     * const behaviorSummary = await prisma.behaviorSummary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BehaviorSummaryCreateManyArgs>(args?: SelectSubset<T, BehaviorSummaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BehaviorSummaries and returns the data saved in the database.
     * @param {BehaviorSummaryCreateManyAndReturnArgs} args - Arguments to create many BehaviorSummaries.
     * @example
     * // Create many BehaviorSummaries
     * const behaviorSummary = await prisma.behaviorSummary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BehaviorSummaries and only return the `id`
     * const behaviorSummaryWithIdOnly = await prisma.behaviorSummary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BehaviorSummaryCreateManyAndReturnArgs>(args?: SelectSubset<T, BehaviorSummaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BehaviorSummary.
     * @param {BehaviorSummaryDeleteArgs} args - Arguments to delete one BehaviorSummary.
     * @example
     * // Delete one BehaviorSummary
     * const BehaviorSummary = await prisma.behaviorSummary.delete({
     *   where: {
     *     // ... filter to delete one BehaviorSummary
     *   }
     * })
     * 
     */
    delete<T extends BehaviorSummaryDeleteArgs>(args: SelectSubset<T, BehaviorSummaryDeleteArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BehaviorSummary.
     * @param {BehaviorSummaryUpdateArgs} args - Arguments to update one BehaviorSummary.
     * @example
     * // Update one BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BehaviorSummaryUpdateArgs>(args: SelectSubset<T, BehaviorSummaryUpdateArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BehaviorSummaries.
     * @param {BehaviorSummaryDeleteManyArgs} args - Arguments to filter BehaviorSummaries to delete.
     * @example
     * // Delete a few BehaviorSummaries
     * const { count } = await prisma.behaviorSummary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BehaviorSummaryDeleteManyArgs>(args?: SelectSubset<T, BehaviorSummaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BehaviorSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BehaviorSummaries
     * const behaviorSummary = await prisma.behaviorSummary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BehaviorSummaryUpdateManyArgs>(args: SelectSubset<T, BehaviorSummaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BehaviorSummaries and returns the data updated in the database.
     * @param {BehaviorSummaryUpdateManyAndReturnArgs} args - Arguments to update many BehaviorSummaries.
     * @example
     * // Update many BehaviorSummaries
     * const behaviorSummary = await prisma.behaviorSummary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BehaviorSummaries and only return the `id`
     * const behaviorSummaryWithIdOnly = await prisma.behaviorSummary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BehaviorSummaryUpdateManyAndReturnArgs>(args: SelectSubset<T, BehaviorSummaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BehaviorSummary.
     * @param {BehaviorSummaryUpsertArgs} args - Arguments to update or create a BehaviorSummary.
     * @example
     * // Update or create a BehaviorSummary
     * const behaviorSummary = await prisma.behaviorSummary.upsert({
     *   create: {
     *     // ... data to create a BehaviorSummary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BehaviorSummary we want to update
     *   }
     * })
     */
    upsert<T extends BehaviorSummaryUpsertArgs>(args: SelectSubset<T, BehaviorSummaryUpsertArgs<ExtArgs>>): Prisma__BehaviorSummaryClient<$Result.GetResult<Prisma.$BehaviorSummaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BehaviorSummaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryCountArgs} args - Arguments to filter BehaviorSummaries to count.
     * @example
     * // Count the number of BehaviorSummaries
     * const count = await prisma.behaviorSummary.count({
     *   where: {
     *     // ... the filter for the BehaviorSummaries we want to count
     *   }
     * })
    **/
    count<T extends BehaviorSummaryCountArgs>(
      args?: Subset<T, BehaviorSummaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BehaviorSummaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BehaviorSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BehaviorSummaryAggregateArgs>(args: Subset<T, BehaviorSummaryAggregateArgs>): Prisma.PrismaPromise<GetBehaviorSummaryAggregateType<T>>

    /**
     * Group by BehaviorSummary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BehaviorSummaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BehaviorSummaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BehaviorSummaryGroupByArgs['orderBy'] }
        : { orderBy?: BehaviorSummaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BehaviorSummaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBehaviorSummaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BehaviorSummary model
   */
  readonly fields: BehaviorSummaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BehaviorSummary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BehaviorSummaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BehaviorSummary model
   */
  interface BehaviorSummaryFieldRefs {
    readonly id: FieldRef<"BehaviorSummary", 'String'>
    readonly userId: FieldRef<"BehaviorSummary", 'String'>
    readonly summary: FieldRef<"BehaviorSummary", 'Json'>
    readonly updatedAt: FieldRef<"BehaviorSummary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BehaviorSummary findUnique
   */
  export type BehaviorSummaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter, which BehaviorSummary to fetch.
     */
    where: BehaviorSummaryWhereUniqueInput
  }

  /**
   * BehaviorSummary findUniqueOrThrow
   */
  export type BehaviorSummaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter, which BehaviorSummary to fetch.
     */
    where: BehaviorSummaryWhereUniqueInput
  }

  /**
   * BehaviorSummary findFirst
   */
  export type BehaviorSummaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter, which BehaviorSummary to fetch.
     */
    where?: BehaviorSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BehaviorSummaries to fetch.
     */
    orderBy?: BehaviorSummaryOrderByWithRelationInput | BehaviorSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BehaviorSummaries.
     */
    cursor?: BehaviorSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BehaviorSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BehaviorSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BehaviorSummaries.
     */
    distinct?: BehaviorSummaryScalarFieldEnum | BehaviorSummaryScalarFieldEnum[]
  }

  /**
   * BehaviorSummary findFirstOrThrow
   */
  export type BehaviorSummaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter, which BehaviorSummary to fetch.
     */
    where?: BehaviorSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BehaviorSummaries to fetch.
     */
    orderBy?: BehaviorSummaryOrderByWithRelationInput | BehaviorSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BehaviorSummaries.
     */
    cursor?: BehaviorSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BehaviorSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BehaviorSummaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BehaviorSummaries.
     */
    distinct?: BehaviorSummaryScalarFieldEnum | BehaviorSummaryScalarFieldEnum[]
  }

  /**
   * BehaviorSummary findMany
   */
  export type BehaviorSummaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter, which BehaviorSummaries to fetch.
     */
    where?: BehaviorSummaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BehaviorSummaries to fetch.
     */
    orderBy?: BehaviorSummaryOrderByWithRelationInput | BehaviorSummaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BehaviorSummaries.
     */
    cursor?: BehaviorSummaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BehaviorSummaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BehaviorSummaries.
     */
    skip?: number
    distinct?: BehaviorSummaryScalarFieldEnum | BehaviorSummaryScalarFieldEnum[]
  }

  /**
   * BehaviorSummary create
   */
  export type BehaviorSummaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * The data needed to create a BehaviorSummary.
     */
    data: XOR<BehaviorSummaryCreateInput, BehaviorSummaryUncheckedCreateInput>
  }

  /**
   * BehaviorSummary createMany
   */
  export type BehaviorSummaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BehaviorSummaries.
     */
    data: BehaviorSummaryCreateManyInput | BehaviorSummaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BehaviorSummary createManyAndReturn
   */
  export type BehaviorSummaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * The data used to create many BehaviorSummaries.
     */
    data: BehaviorSummaryCreateManyInput | BehaviorSummaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BehaviorSummary update
   */
  export type BehaviorSummaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * The data needed to update a BehaviorSummary.
     */
    data: XOR<BehaviorSummaryUpdateInput, BehaviorSummaryUncheckedUpdateInput>
    /**
     * Choose, which BehaviorSummary to update.
     */
    where: BehaviorSummaryWhereUniqueInput
  }

  /**
   * BehaviorSummary updateMany
   */
  export type BehaviorSummaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BehaviorSummaries.
     */
    data: XOR<BehaviorSummaryUpdateManyMutationInput, BehaviorSummaryUncheckedUpdateManyInput>
    /**
     * Filter which BehaviorSummaries to update
     */
    where?: BehaviorSummaryWhereInput
    /**
     * Limit how many BehaviorSummaries to update.
     */
    limit?: number
  }

  /**
   * BehaviorSummary updateManyAndReturn
   */
  export type BehaviorSummaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * The data used to update BehaviorSummaries.
     */
    data: XOR<BehaviorSummaryUpdateManyMutationInput, BehaviorSummaryUncheckedUpdateManyInput>
    /**
     * Filter which BehaviorSummaries to update
     */
    where?: BehaviorSummaryWhereInput
    /**
     * Limit how many BehaviorSummaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BehaviorSummary upsert
   */
  export type BehaviorSummaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * The filter to search for the BehaviorSummary to update in case it exists.
     */
    where: BehaviorSummaryWhereUniqueInput
    /**
     * In case the BehaviorSummary found by the `where` argument doesn't exist, create a new BehaviorSummary with this data.
     */
    create: XOR<BehaviorSummaryCreateInput, BehaviorSummaryUncheckedCreateInput>
    /**
     * In case the BehaviorSummary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BehaviorSummaryUpdateInput, BehaviorSummaryUncheckedUpdateInput>
  }

  /**
   * BehaviorSummary delete
   */
  export type BehaviorSummaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
    /**
     * Filter which BehaviorSummary to delete.
     */
    where: BehaviorSummaryWhereUniqueInput
  }

  /**
   * BehaviorSummary deleteMany
   */
  export type BehaviorSummaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BehaviorSummaries to delete
     */
    where?: BehaviorSummaryWhereInput
    /**
     * Limit how many BehaviorSummaries to delete.
     */
    limit?: number
  }

  /**
   * BehaviorSummary without action
   */
  export type BehaviorSummaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BehaviorSummary
     */
    select?: BehaviorSummarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BehaviorSummary
     */
    omit?: BehaviorSummaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BehaviorSummaryInclude<ExtArgs> | null
  }


  /**
   * Model Preferences
   */

  export type AggregatePreferences = {
    _count: PreferencesCountAggregateOutputType | null
    _min: PreferencesMinAggregateOutputType | null
    _max: PreferencesMaxAggregateOutputType | null
  }

  export type PreferencesMinAggregateOutputType = {
    id: string | null
    timezone: string | null
    dateFormat: string | null
    userId: string | null
  }

  export type PreferencesMaxAggregateOutputType = {
    id: string | null
    timezone: string | null
    dateFormat: string | null
    userId: string | null
  }

  export type PreferencesCountAggregateOutputType = {
    id: number
    timezone: number
    dateFormat: number
    userId: number
    _all: number
  }


  export type PreferencesMinAggregateInputType = {
    id?: true
    timezone?: true
    dateFormat?: true
    userId?: true
  }

  export type PreferencesMaxAggregateInputType = {
    id?: true
    timezone?: true
    dateFormat?: true
    userId?: true
  }

  export type PreferencesCountAggregateInputType = {
    id?: true
    timezone?: true
    dateFormat?: true
    userId?: true
    _all?: true
  }

  export type PreferencesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preferences to aggregate.
     */
    where?: PreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferencesOrderByWithRelationInput | PreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Preferences
    **/
    _count?: true | PreferencesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreferencesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreferencesMaxAggregateInputType
  }

  export type GetPreferencesAggregateType<T extends PreferencesAggregateArgs> = {
        [P in keyof T & keyof AggregatePreferences]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreferences[P]>
      : GetScalarType<T[P], AggregatePreferences[P]>
  }




  export type PreferencesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferencesWhereInput
    orderBy?: PreferencesOrderByWithAggregationInput | PreferencesOrderByWithAggregationInput[]
    by: PreferencesScalarFieldEnum[] | PreferencesScalarFieldEnum
    having?: PreferencesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreferencesCountAggregateInputType | true
    _min?: PreferencesMinAggregateInputType
    _max?: PreferencesMaxAggregateInputType
  }

  export type PreferencesGroupByOutputType = {
    id: string
    timezone: string
    dateFormat: string
    userId: string
    _count: PreferencesCountAggregateOutputType | null
    _min: PreferencesMinAggregateOutputType | null
    _max: PreferencesMaxAggregateOutputType | null
  }

  type GetPreferencesGroupByPayload<T extends PreferencesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreferencesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreferencesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreferencesGroupByOutputType[P]>
            : GetScalarType<T[P], PreferencesGroupByOutputType[P]>
        }
      >
    >


  export type PreferencesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timezone?: boolean
    dateFormat?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferences"]>

  export type PreferencesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timezone?: boolean
    dateFormat?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferences"]>

  export type PreferencesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timezone?: boolean
    dateFormat?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preferences"]>

  export type PreferencesSelectScalar = {
    id?: boolean
    timezone?: boolean
    dateFormat?: boolean
    userId?: boolean
  }

  export type PreferencesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timezone" | "dateFormat" | "userId", ExtArgs["result"]["preferences"]>
  export type PreferencesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PreferencesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PreferencesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PreferencesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preferences"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      timezone: string
      dateFormat: string
      userId: string
    }, ExtArgs["result"]["preferences"]>
    composites: {}
  }

  type PreferencesGetPayload<S extends boolean | null | undefined | PreferencesDefaultArgs> = $Result.GetResult<Prisma.$PreferencesPayload, S>

  type PreferencesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreferencesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreferencesCountAggregateInputType | true
    }

  export interface PreferencesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preferences'], meta: { name: 'Preferences' } }
    /**
     * Find zero or one Preferences that matches the filter.
     * @param {PreferencesFindUniqueArgs} args - Arguments to find a Preferences
     * @example
     * // Get one Preferences
     * const preferences = await prisma.preferences.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreferencesFindUniqueArgs>(args: SelectSubset<T, PreferencesFindUniqueArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preferences that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreferencesFindUniqueOrThrowArgs} args - Arguments to find a Preferences
     * @example
     * // Get one Preferences
     * const preferences = await prisma.preferences.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreferencesFindUniqueOrThrowArgs>(args: SelectSubset<T, PreferencesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesFindFirstArgs} args - Arguments to find a Preferences
     * @example
     * // Get one Preferences
     * const preferences = await prisma.preferences.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreferencesFindFirstArgs>(args?: SelectSubset<T, PreferencesFindFirstArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preferences that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesFindFirstOrThrowArgs} args - Arguments to find a Preferences
     * @example
     * // Get one Preferences
     * const preferences = await prisma.preferences.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreferencesFindFirstOrThrowArgs>(args?: SelectSubset<T, PreferencesFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Preferences
     * const preferences = await prisma.preferences.findMany()
     * 
     * // Get first 10 Preferences
     * const preferences = await prisma.preferences.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preferencesWithIdOnly = await prisma.preferences.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreferencesFindManyArgs>(args?: SelectSubset<T, PreferencesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preferences.
     * @param {PreferencesCreateArgs} args - Arguments to create a Preferences.
     * @example
     * // Create one Preferences
     * const Preferences = await prisma.preferences.create({
     *   data: {
     *     // ... data to create a Preferences
     *   }
     * })
     * 
     */
    create<T extends PreferencesCreateArgs>(args: SelectSubset<T, PreferencesCreateArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Preferences.
     * @param {PreferencesCreateManyArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preferences = await prisma.preferences.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreferencesCreateManyArgs>(args?: SelectSubset<T, PreferencesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Preferences and returns the data saved in the database.
     * @param {PreferencesCreateManyAndReturnArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preferences = await prisma.preferences.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Preferences and only return the `id`
     * const preferencesWithIdOnly = await prisma.preferences.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreferencesCreateManyAndReturnArgs>(args?: SelectSubset<T, PreferencesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Preferences.
     * @param {PreferencesDeleteArgs} args - Arguments to delete one Preferences.
     * @example
     * // Delete one Preferences
     * const Preferences = await prisma.preferences.delete({
     *   where: {
     *     // ... filter to delete one Preferences
     *   }
     * })
     * 
     */
    delete<T extends PreferencesDeleteArgs>(args: SelectSubset<T, PreferencesDeleteArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preferences.
     * @param {PreferencesUpdateArgs} args - Arguments to update one Preferences.
     * @example
     * // Update one Preferences
     * const preferences = await prisma.preferences.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreferencesUpdateArgs>(args: SelectSubset<T, PreferencesUpdateArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Preferences.
     * @param {PreferencesDeleteManyArgs} args - Arguments to filter Preferences to delete.
     * @example
     * // Delete a few Preferences
     * const { count } = await prisma.preferences.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreferencesDeleteManyArgs>(args?: SelectSubset<T, PreferencesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Preferences
     * const preferences = await prisma.preferences.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreferencesUpdateManyArgs>(args: SelectSubset<T, PreferencesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences and returns the data updated in the database.
     * @param {PreferencesUpdateManyAndReturnArgs} args - Arguments to update many Preferences.
     * @example
     * // Update many Preferences
     * const preferences = await prisma.preferences.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Preferences and only return the `id`
     * const preferencesWithIdOnly = await prisma.preferences.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreferencesUpdateManyAndReturnArgs>(args: SelectSubset<T, PreferencesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Preferences.
     * @param {PreferencesUpsertArgs} args - Arguments to update or create a Preferences.
     * @example
     * // Update or create a Preferences
     * const preferences = await prisma.preferences.upsert({
     *   create: {
     *     // ... data to create a Preferences
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preferences we want to update
     *   }
     * })
     */
    upsert<T extends PreferencesUpsertArgs>(args: SelectSubset<T, PreferencesUpsertArgs<ExtArgs>>): Prisma__PreferencesClient<$Result.GetResult<Prisma.$PreferencesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesCountArgs} args - Arguments to filter Preferences to count.
     * @example
     * // Count the number of Preferences
     * const count = await prisma.preferences.count({
     *   where: {
     *     // ... the filter for the Preferences we want to count
     *   }
     * })
    **/
    count<T extends PreferencesCountArgs>(
      args?: Subset<T, PreferencesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreferencesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreferencesAggregateArgs>(args: Subset<T, PreferencesAggregateArgs>): Prisma.PrismaPromise<GetPreferencesAggregateType<T>>

    /**
     * Group by Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferencesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreferencesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreferencesGroupByArgs['orderBy'] }
        : { orderBy?: PreferencesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreferencesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreferencesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preferences model
   */
  readonly fields: PreferencesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preferences.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreferencesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preferences model
   */
  interface PreferencesFieldRefs {
    readonly id: FieldRef<"Preferences", 'String'>
    readonly timezone: FieldRef<"Preferences", 'String'>
    readonly dateFormat: FieldRef<"Preferences", 'String'>
    readonly userId: FieldRef<"Preferences", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Preferences findUnique
   */
  export type PreferencesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where: PreferencesWhereUniqueInput
  }

  /**
   * Preferences findUniqueOrThrow
   */
  export type PreferencesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where: PreferencesWhereUniqueInput
  }

  /**
   * Preferences findFirst
   */
  export type PreferencesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where?: PreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferencesOrderByWithRelationInput | PreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferencesScalarFieldEnum | PreferencesScalarFieldEnum[]
  }

  /**
   * Preferences findFirstOrThrow
   */
  export type PreferencesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where?: PreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferencesOrderByWithRelationInput | PreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferencesScalarFieldEnum | PreferencesScalarFieldEnum[]
  }

  /**
   * Preferences findMany
   */
  export type PreferencesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where?: PreferencesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferencesOrderByWithRelationInput | PreferencesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Preferences.
     */
    cursor?: PreferencesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    distinct?: PreferencesScalarFieldEnum | PreferencesScalarFieldEnum[]
  }

  /**
   * Preferences create
   */
  export type PreferencesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * The data needed to create a Preferences.
     */
    data: XOR<PreferencesCreateInput, PreferencesUncheckedCreateInput>
  }

  /**
   * Preferences createMany
   */
  export type PreferencesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Preferences.
     */
    data: PreferencesCreateManyInput | PreferencesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preferences createManyAndReturn
   */
  export type PreferencesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * The data used to create many Preferences.
     */
    data: PreferencesCreateManyInput | PreferencesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preferences update
   */
  export type PreferencesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * The data needed to update a Preferences.
     */
    data: XOR<PreferencesUpdateInput, PreferencesUncheckedUpdateInput>
    /**
     * Choose, which Preferences to update.
     */
    where: PreferencesWhereUniqueInput
  }

  /**
   * Preferences updateMany
   */
  export type PreferencesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferencesUpdateManyMutationInput, PreferencesUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferencesWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
  }

  /**
   * Preferences updateManyAndReturn
   */
  export type PreferencesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferencesUpdateManyMutationInput, PreferencesUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferencesWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preferences upsert
   */
  export type PreferencesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * The filter to search for the Preferences to update in case it exists.
     */
    where: PreferencesWhereUniqueInput
    /**
     * In case the Preferences found by the `where` argument doesn't exist, create a new Preferences with this data.
     */
    create: XOR<PreferencesCreateInput, PreferencesUncheckedCreateInput>
    /**
     * In case the Preferences was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreferencesUpdateInput, PreferencesUncheckedUpdateInput>
  }

  /**
   * Preferences delete
   */
  export type PreferencesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
    /**
     * Filter which Preferences to delete.
     */
    where: PreferencesWhereUniqueInput
  }

  /**
   * Preferences deleteMany
   */
  export type PreferencesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preferences to delete
     */
    where?: PreferencesWhereInput
    /**
     * Limit how many Preferences to delete.
     */
    limit?: number
  }

  /**
   * Preferences without action
   */
  export type PreferencesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preferences
     */
    select?: PreferencesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preferences
     */
    omit?: PreferencesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferencesInclude<ExtArgs> | null
  }


  /**
   * Model AITools
   */

  export type AggregateAITools = {
    _count: AIToolsCountAggregateOutputType | null
    _min: AIToolsMinAggregateOutputType | null
    _max: AIToolsMaxAggregateOutputType | null
  }

  export type AIToolsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    toolType: string | null
    createdAt: Date | null
  }

  export type AIToolsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    toolType: string | null
    createdAt: Date | null
  }

  export type AIToolsCountAggregateOutputType = {
    id: number
    userId: number
    toolType: number
    inputData: number
    outputData: number
    createdAt: number
    _all: number
  }


  export type AIToolsMinAggregateInputType = {
    id?: true
    userId?: true
    toolType?: true
    createdAt?: true
  }

  export type AIToolsMaxAggregateInputType = {
    id?: true
    userId?: true
    toolType?: true
    createdAt?: true
  }

  export type AIToolsCountAggregateInputType = {
    id?: true
    userId?: true
    toolType?: true
    inputData?: true
    outputData?: true
    createdAt?: true
    _all?: true
  }

  export type AIToolsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITools to aggregate.
     */
    where?: AIToolsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITools to fetch.
     */
    orderBy?: AIToolsOrderByWithRelationInput | AIToolsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIToolsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AITools
    **/
    _count?: true | AIToolsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIToolsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIToolsMaxAggregateInputType
  }

  export type GetAIToolsAggregateType<T extends AIToolsAggregateArgs> = {
        [P in keyof T & keyof AggregateAITools]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAITools[P]>
      : GetScalarType<T[P], AggregateAITools[P]>
  }




  export type AIToolsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIToolsWhereInput
    orderBy?: AIToolsOrderByWithAggregationInput | AIToolsOrderByWithAggregationInput[]
    by: AIToolsScalarFieldEnum[] | AIToolsScalarFieldEnum
    having?: AIToolsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIToolsCountAggregateInputType | true
    _min?: AIToolsMinAggregateInputType
    _max?: AIToolsMaxAggregateInputType
  }

  export type AIToolsGroupByOutputType = {
    id: string
    userId: string
    toolType: string
    inputData: JsonValue
    outputData: JsonValue
    createdAt: Date
    _count: AIToolsCountAggregateOutputType | null
    _min: AIToolsMinAggregateOutputType | null
    _max: AIToolsMaxAggregateOutputType | null
  }

  type GetAIToolsGroupByPayload<T extends AIToolsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIToolsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIToolsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIToolsGroupByOutputType[P]>
            : GetScalarType<T[P], AIToolsGroupByOutputType[P]>
        }
      >
    >


  export type AIToolsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    toolType?: boolean
    inputData?: boolean
    outputData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITools"]>

  export type AIToolsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    toolType?: boolean
    inputData?: boolean
    outputData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITools"]>

  export type AIToolsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    toolType?: boolean
    inputData?: boolean
    outputData?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aITools"]>

  export type AIToolsSelectScalar = {
    id?: boolean
    userId?: boolean
    toolType?: boolean
    inputData?: boolean
    outputData?: boolean
    createdAt?: boolean
  }

  export type AIToolsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "toolType" | "inputData" | "outputData" | "createdAt", ExtArgs["result"]["aITools"]>
  export type AIToolsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AIToolsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AIToolsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AIToolsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AITools"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      toolType: string
      inputData: Prisma.JsonValue
      outputData: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["aITools"]>
    composites: {}
  }

  type AIToolsGetPayload<S extends boolean | null | undefined | AIToolsDefaultArgs> = $Result.GetResult<Prisma.$AIToolsPayload, S>

  type AIToolsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIToolsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIToolsCountAggregateInputType | true
    }

  export interface AIToolsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AITools'], meta: { name: 'AITools' } }
    /**
     * Find zero or one AITools that matches the filter.
     * @param {AIToolsFindUniqueArgs} args - Arguments to find a AITools
     * @example
     * // Get one AITools
     * const aITools = await prisma.aITools.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIToolsFindUniqueArgs>(args: SelectSubset<T, AIToolsFindUniqueArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AITools that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIToolsFindUniqueOrThrowArgs} args - Arguments to find a AITools
     * @example
     * // Get one AITools
     * const aITools = await prisma.aITools.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIToolsFindUniqueOrThrowArgs>(args: SelectSubset<T, AIToolsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsFindFirstArgs} args - Arguments to find a AITools
     * @example
     * // Get one AITools
     * const aITools = await prisma.aITools.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIToolsFindFirstArgs>(args?: SelectSubset<T, AIToolsFindFirstArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AITools that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsFindFirstOrThrowArgs} args - Arguments to find a AITools
     * @example
     * // Get one AITools
     * const aITools = await prisma.aITools.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIToolsFindFirstOrThrowArgs>(args?: SelectSubset<T, AIToolsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AITools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AITools
     * const aITools = await prisma.aITools.findMany()
     * 
     * // Get first 10 AITools
     * const aITools = await prisma.aITools.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIToolsWithIdOnly = await prisma.aITools.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIToolsFindManyArgs>(args?: SelectSubset<T, AIToolsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AITools.
     * @param {AIToolsCreateArgs} args - Arguments to create a AITools.
     * @example
     * // Create one AITools
     * const AITools = await prisma.aITools.create({
     *   data: {
     *     // ... data to create a AITools
     *   }
     * })
     * 
     */
    create<T extends AIToolsCreateArgs>(args: SelectSubset<T, AIToolsCreateArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AITools.
     * @param {AIToolsCreateManyArgs} args - Arguments to create many AITools.
     * @example
     * // Create many AITools
     * const aITools = await prisma.aITools.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIToolsCreateManyArgs>(args?: SelectSubset<T, AIToolsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AITools and returns the data saved in the database.
     * @param {AIToolsCreateManyAndReturnArgs} args - Arguments to create many AITools.
     * @example
     * // Create many AITools
     * const aITools = await prisma.aITools.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AITools and only return the `id`
     * const aIToolsWithIdOnly = await prisma.aITools.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIToolsCreateManyAndReturnArgs>(args?: SelectSubset<T, AIToolsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AITools.
     * @param {AIToolsDeleteArgs} args - Arguments to delete one AITools.
     * @example
     * // Delete one AITools
     * const AITools = await prisma.aITools.delete({
     *   where: {
     *     // ... filter to delete one AITools
     *   }
     * })
     * 
     */
    delete<T extends AIToolsDeleteArgs>(args: SelectSubset<T, AIToolsDeleteArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AITools.
     * @param {AIToolsUpdateArgs} args - Arguments to update one AITools.
     * @example
     * // Update one AITools
     * const aITools = await prisma.aITools.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIToolsUpdateArgs>(args: SelectSubset<T, AIToolsUpdateArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AITools.
     * @param {AIToolsDeleteManyArgs} args - Arguments to filter AITools to delete.
     * @example
     * // Delete a few AITools
     * const { count } = await prisma.aITools.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIToolsDeleteManyArgs>(args?: SelectSubset<T, AIToolsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AITools
     * const aITools = await prisma.aITools.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIToolsUpdateManyArgs>(args: SelectSubset<T, AIToolsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AITools and returns the data updated in the database.
     * @param {AIToolsUpdateManyAndReturnArgs} args - Arguments to update many AITools.
     * @example
     * // Update many AITools
     * const aITools = await prisma.aITools.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AITools and only return the `id`
     * const aIToolsWithIdOnly = await prisma.aITools.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIToolsUpdateManyAndReturnArgs>(args: SelectSubset<T, AIToolsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AITools.
     * @param {AIToolsUpsertArgs} args - Arguments to update or create a AITools.
     * @example
     * // Update or create a AITools
     * const aITools = await prisma.aITools.upsert({
     *   create: {
     *     // ... data to create a AITools
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AITools we want to update
     *   }
     * })
     */
    upsert<T extends AIToolsUpsertArgs>(args: SelectSubset<T, AIToolsUpsertArgs<ExtArgs>>): Prisma__AIToolsClient<$Result.GetResult<Prisma.$AIToolsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AITools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsCountArgs} args - Arguments to filter AITools to count.
     * @example
     * // Count the number of AITools
     * const count = await prisma.aITools.count({
     *   where: {
     *     // ... the filter for the AITools we want to count
     *   }
     * })
    **/
    count<T extends AIToolsCountArgs>(
      args?: Subset<T, AIToolsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIToolsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AITools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIToolsAggregateArgs>(args: Subset<T, AIToolsAggregateArgs>): Prisma.PrismaPromise<GetAIToolsAggregateType<T>>

    /**
     * Group by AITools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIToolsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIToolsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIToolsGroupByArgs['orderBy'] }
        : { orderBy?: AIToolsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIToolsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIToolsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AITools model
   */
  readonly fields: AIToolsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AITools.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIToolsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AITools model
   */
  interface AIToolsFieldRefs {
    readonly id: FieldRef<"AITools", 'String'>
    readonly userId: FieldRef<"AITools", 'String'>
    readonly toolType: FieldRef<"AITools", 'String'>
    readonly inputData: FieldRef<"AITools", 'Json'>
    readonly outputData: FieldRef<"AITools", 'Json'>
    readonly createdAt: FieldRef<"AITools", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AITools findUnique
   */
  export type AIToolsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter, which AITools to fetch.
     */
    where: AIToolsWhereUniqueInput
  }

  /**
   * AITools findUniqueOrThrow
   */
  export type AIToolsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter, which AITools to fetch.
     */
    where: AIToolsWhereUniqueInput
  }

  /**
   * AITools findFirst
   */
  export type AIToolsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter, which AITools to fetch.
     */
    where?: AIToolsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITools to fetch.
     */
    orderBy?: AIToolsOrderByWithRelationInput | AIToolsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITools.
     */
    cursor?: AIToolsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITools.
     */
    distinct?: AIToolsScalarFieldEnum | AIToolsScalarFieldEnum[]
  }

  /**
   * AITools findFirstOrThrow
   */
  export type AIToolsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter, which AITools to fetch.
     */
    where?: AIToolsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITools to fetch.
     */
    orderBy?: AIToolsOrderByWithRelationInput | AIToolsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AITools.
     */
    cursor?: AIToolsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AITools.
     */
    distinct?: AIToolsScalarFieldEnum | AIToolsScalarFieldEnum[]
  }

  /**
   * AITools findMany
   */
  export type AIToolsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter, which AITools to fetch.
     */
    where?: AIToolsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AITools to fetch.
     */
    orderBy?: AIToolsOrderByWithRelationInput | AIToolsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AITools.
     */
    cursor?: AIToolsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AITools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AITools.
     */
    skip?: number
    distinct?: AIToolsScalarFieldEnum | AIToolsScalarFieldEnum[]
  }

  /**
   * AITools create
   */
  export type AIToolsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * The data needed to create a AITools.
     */
    data: XOR<AIToolsCreateInput, AIToolsUncheckedCreateInput>
  }

  /**
   * AITools createMany
   */
  export type AIToolsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AITools.
     */
    data: AIToolsCreateManyInput | AIToolsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AITools createManyAndReturn
   */
  export type AIToolsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * The data used to create many AITools.
     */
    data: AIToolsCreateManyInput | AIToolsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITools update
   */
  export type AIToolsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * The data needed to update a AITools.
     */
    data: XOR<AIToolsUpdateInput, AIToolsUncheckedUpdateInput>
    /**
     * Choose, which AITools to update.
     */
    where: AIToolsWhereUniqueInput
  }

  /**
   * AITools updateMany
   */
  export type AIToolsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AITools.
     */
    data: XOR<AIToolsUpdateManyMutationInput, AIToolsUncheckedUpdateManyInput>
    /**
     * Filter which AITools to update
     */
    where?: AIToolsWhereInput
    /**
     * Limit how many AITools to update.
     */
    limit?: number
  }

  /**
   * AITools updateManyAndReturn
   */
  export type AIToolsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * The data used to update AITools.
     */
    data: XOR<AIToolsUpdateManyMutationInput, AIToolsUncheckedUpdateManyInput>
    /**
     * Filter which AITools to update
     */
    where?: AIToolsWhereInput
    /**
     * Limit how many AITools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AITools upsert
   */
  export type AIToolsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * The filter to search for the AITools to update in case it exists.
     */
    where: AIToolsWhereUniqueInput
    /**
     * In case the AITools found by the `where` argument doesn't exist, create a new AITools with this data.
     */
    create: XOR<AIToolsCreateInput, AIToolsUncheckedCreateInput>
    /**
     * In case the AITools was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIToolsUpdateInput, AIToolsUncheckedUpdateInput>
  }

  /**
   * AITools delete
   */
  export type AIToolsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
    /**
     * Filter which AITools to delete.
     */
    where: AIToolsWhereUniqueInput
  }

  /**
   * AITools deleteMany
   */
  export type AIToolsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AITools to delete
     */
    where?: AIToolsWhereInput
    /**
     * Limit how many AITools to delete.
     */
    limit?: number
  }

  /**
   * AITools without action
   */
  export type AIToolsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AITools
     */
    select?: AIToolsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AITools
     */
    omit?: AIToolsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIToolsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    googleId: 'googleId',
    password: 'password',
    avatar: 'avatar',
    email: 'email',
    name: 'name',
    username: 'username',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    location: 'location',
    desc: 'desc',
    startTime: 'startTime',
    endTime: 'endTime',
    recurringDays: 'recurringDays',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    color: 'color',
    colorName: 'colorName',
    textColor: 'textColor',
    userId: 'userId'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ConflictScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    errorId: 'errorId',
    summary: 'summary',
    analysis: 'analysis',
    status: 'status',
    detectedAt: 'detectedAt',
    resolvedAt: 'resolvedAt'
  };

  export type ConflictScalarFieldEnum = (typeof ConflictScalarFieldEnum)[keyof typeof ConflictScalarFieldEnum]


  export const ConflictTaskScalarFieldEnum: {
    id: 'id',
    conflictId: 'conflictId',
    eventId: 'eventId',
    title: 'title',
    startTime: 'startTime',
    endTime: 'endTime',
    displayStart: 'displayStart',
    displayEnd: 'displayEnd',
    relativeStart: 'relativeStart',
    relativeEnd: 'relativeEnd',
    taskType: 'taskType',
    priority: 'priority'
  };

  export type ConflictTaskScalarFieldEnum = (typeof ConflictTaskScalarFieldEnum)[keyof typeof ConflictTaskScalarFieldEnum]


  export const ConflictProposalScalarFieldEnum: {
    id: 'id',
    conflictId: 'conflictId',
    eventId: 'eventId',
    title: 'title',
    proposedStart: 'proposedStart',
    proposedEnd: 'proposedEnd',
    displayStart: 'displayStart',
    displayEnd: 'displayEnd',
    relativeStart: 'relativeStart',
    relativeEnd: 'relativeEnd',
    taskType: 'taskType',
    reasoning: 'reasoning'
  };

  export type ConflictProposalScalarFieldEnum = (typeof ConflictProposalScalarFieldEnum)[keyof typeof ConflictProposalScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    completed: 'completed'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const MoodLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    mood: 'mood',
    createdAt: 'createdAt'
  };

  export type MoodLogScalarFieldEnum = (typeof MoodLogScalarFieldEnum)[keyof typeof MoodLogScalarFieldEnum]


  export const SleepLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sleepTime: 'sleepTime',
    wakeTime: 'wakeTime'
  };

  export type SleepLogScalarFieldEnum = (typeof SleepLogScalarFieldEnum)[keyof typeof SleepLogScalarFieldEnum]


  export const BehaviorSummaryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    summary: 'summary',
    updatedAt: 'updatedAt'
  };

  export type BehaviorSummaryScalarFieldEnum = (typeof BehaviorSummaryScalarFieldEnum)[keyof typeof BehaviorSummaryScalarFieldEnum]


  export const PreferencesScalarFieldEnum: {
    id: 'id',
    timezone: 'timezone',
    dateFormat: 'dateFormat',
    userId: 'userId'
  };

  export type PreferencesScalarFieldEnum = (typeof PreferencesScalarFieldEnum)[keyof typeof PreferencesScalarFieldEnum]


  export const AIToolsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    toolType: 'toolType',
    inputData: 'inputData',
    outputData: 'outputData',
    createdAt: 'createdAt'
  };

  export type AIToolsScalarFieldEnum = (typeof AIToolsScalarFieldEnum)[keyof typeof AIToolsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ConflictStatus'
   */
  export type EnumConflictStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConflictStatus'>
    


  /**
   * Reference to a field of type 'ConflictStatus[]'
   */
  export type ListEnumConflictStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConflictStatus[]'>
    


  /**
   * Reference to a field of type 'TaskType'
   */
  export type EnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType'>
    


  /**
   * Reference to a field of type 'TaskType[]'
   */
  export type ListEnumTaskTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskType[]'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Priority[]'
   */
  export type ListEnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    googleId?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
    tasks?: TaskListRelationFilter
    moods?: MoodLogListRelationFilter
    sleep?: XOR<SleepLogNullableScalarRelationFilter, SleepLogWhereInput> | null
    behavior?: XOR<BehaviorSummaryNullableScalarRelationFilter, BehaviorSummaryWhereInput> | null
    preferences?: XOR<PreferencesNullableScalarRelationFilter, PreferencesWhereInput> | null
    actions?: AIToolsListRelationFilter
    conflicts?: ConflictListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    googleId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    moods?: MoodLogOrderByRelationAggregateInput
    sleep?: SleepLogOrderByWithRelationInput
    behavior?: BehaviorSummaryOrderByWithRelationInput
    preferences?: PreferencesOrderByWithRelationInput
    actions?: AIToolsOrderByRelationAggregateInput
    conflicts?: ConflictOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleId?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
    tasks?: TaskListRelationFilter
    moods?: MoodLogListRelationFilter
    sleep?: XOR<SleepLogNullableScalarRelationFilter, SleepLogWhereInput> | null
    behavior?: XOR<BehaviorSummaryNullableScalarRelationFilter, BehaviorSummaryWhereInput> | null
    preferences?: XOR<PreferencesNullableScalarRelationFilter, PreferencesWhereInput> | null
    actions?: AIToolsListRelationFilter
    conflicts?: ConflictListRelationFilter
  }, "id" | "googleId" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    googleId?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    desc?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    recurringDays?: IntNullableListFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    color?: StringFilter<"Event"> | string
    colorName?: StringFilter<"Event"> | string
    textColor?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conflictTasks?: ConflictTaskListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrderInput | SortOrder
    desc?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    recurringDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    color?: SortOrder
    colorName?: SortOrder
    textColor?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    conflictTasks?: ConflictTaskOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    desc?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    recurringDays?: IntNullableListFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    color?: StringFilter<"Event"> | string
    colorName?: StringFilter<"Event"> | string
    textColor?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    conflictTasks?: ConflictTaskListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrderInput | SortOrder
    desc?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    recurringDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    color?: SortOrder
    colorName?: SortOrder
    textColor?: SortOrder
    userId?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    desc?: StringNullableWithAggregatesFilter<"Event"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    recurringDays?: IntNullableListFilter<"Event">
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    color?: StringWithAggregatesFilter<"Event"> | string
    colorName?: StringWithAggregatesFilter<"Event"> | string
    textColor?: StringWithAggregatesFilter<"Event"> | string
    userId?: StringWithAggregatesFilter<"Event"> | string
  }

  export type ConflictWhereInput = {
    AND?: ConflictWhereInput | ConflictWhereInput[]
    OR?: ConflictWhereInput[]
    NOT?: ConflictWhereInput | ConflictWhereInput[]
    id?: StringFilter<"Conflict"> | string
    userId?: StringFilter<"Conflict"> | string
    errorId?: StringFilter<"Conflict"> | string
    summary?: StringFilter<"Conflict"> | string
    analysis?: StringFilter<"Conflict"> | string
    status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus
    detectedAt?: DateTimeFilter<"Conflict"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Conflict"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: ConflictTaskListRelationFilter
    proposals?: ConflictProposalListRelationFilter
  }

  export type ConflictOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    errorId?: SortOrder
    summary?: SortOrder
    analysis?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    tasks?: ConflictTaskOrderByRelationAggregateInput
    proposals?: ConflictProposalOrderByRelationAggregateInput
  }

  export type ConflictWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConflictWhereInput | ConflictWhereInput[]
    OR?: ConflictWhereInput[]
    NOT?: ConflictWhereInput | ConflictWhereInput[]
    userId?: StringFilter<"Conflict"> | string
    errorId?: StringFilter<"Conflict"> | string
    summary?: StringFilter<"Conflict"> | string
    analysis?: StringFilter<"Conflict"> | string
    status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus
    detectedAt?: DateTimeFilter<"Conflict"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Conflict"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: ConflictTaskListRelationFilter
    proposals?: ConflictProposalListRelationFilter
  }, "id">

  export type ConflictOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    errorId?: SortOrder
    summary?: SortOrder
    analysis?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: ConflictCountOrderByAggregateInput
    _max?: ConflictMaxOrderByAggregateInput
    _min?: ConflictMinOrderByAggregateInput
  }

  export type ConflictScalarWhereWithAggregatesInput = {
    AND?: ConflictScalarWhereWithAggregatesInput | ConflictScalarWhereWithAggregatesInput[]
    OR?: ConflictScalarWhereWithAggregatesInput[]
    NOT?: ConflictScalarWhereWithAggregatesInput | ConflictScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conflict"> | string
    userId?: StringWithAggregatesFilter<"Conflict"> | string
    errorId?: StringWithAggregatesFilter<"Conflict"> | string
    summary?: StringWithAggregatesFilter<"Conflict"> | string
    analysis?: StringWithAggregatesFilter<"Conflict"> | string
    status?: EnumConflictStatusWithAggregatesFilter<"Conflict"> | $Enums.ConflictStatus
    detectedAt?: DateTimeWithAggregatesFilter<"Conflict"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Conflict"> | Date | string | null
  }

  export type ConflictTaskWhereInput = {
    AND?: ConflictTaskWhereInput | ConflictTaskWhereInput[]
    OR?: ConflictTaskWhereInput[]
    NOT?: ConflictTaskWhereInput | ConflictTaskWhereInput[]
    id?: StringFilter<"ConflictTask"> | string
    conflictId?: StringFilter<"ConflictTask"> | string
    eventId?: StringFilter<"ConflictTask"> | string
    title?: StringFilter<"ConflictTask"> | string
    startTime?: DateTimeFilter<"ConflictTask"> | Date | string
    endTime?: DateTimeFilter<"ConflictTask"> | Date | string
    displayStart?: IntFilter<"ConflictTask"> | number
    displayEnd?: IntFilter<"ConflictTask"> | number
    relativeStart?: IntFilter<"ConflictTask"> | number
    relativeEnd?: IntFilter<"ConflictTask"> | number
    taskType?: EnumTaskTypeFilter<"ConflictTask"> | $Enums.TaskType
    priority?: EnumPriorityFilter<"ConflictTask"> | $Enums.Priority
    conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type ConflictTaskOrderByWithRelationInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    priority?: SortOrder
    conflict?: ConflictOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type ConflictTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConflictTaskWhereInput | ConflictTaskWhereInput[]
    OR?: ConflictTaskWhereInput[]
    NOT?: ConflictTaskWhereInput | ConflictTaskWhereInput[]
    conflictId?: StringFilter<"ConflictTask"> | string
    eventId?: StringFilter<"ConflictTask"> | string
    title?: StringFilter<"ConflictTask"> | string
    startTime?: DateTimeFilter<"ConflictTask"> | Date | string
    endTime?: DateTimeFilter<"ConflictTask"> | Date | string
    displayStart?: IntFilter<"ConflictTask"> | number
    displayEnd?: IntFilter<"ConflictTask"> | number
    relativeStart?: IntFilter<"ConflictTask"> | number
    relativeEnd?: IntFilter<"ConflictTask"> | number
    taskType?: EnumTaskTypeFilter<"ConflictTask"> | $Enums.TaskType
    priority?: EnumPriorityFilter<"ConflictTask"> | $Enums.Priority
    conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id">

  export type ConflictTaskOrderByWithAggregationInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    priority?: SortOrder
    _count?: ConflictTaskCountOrderByAggregateInput
    _avg?: ConflictTaskAvgOrderByAggregateInput
    _max?: ConflictTaskMaxOrderByAggregateInput
    _min?: ConflictTaskMinOrderByAggregateInput
    _sum?: ConflictTaskSumOrderByAggregateInput
  }

  export type ConflictTaskScalarWhereWithAggregatesInput = {
    AND?: ConflictTaskScalarWhereWithAggregatesInput | ConflictTaskScalarWhereWithAggregatesInput[]
    OR?: ConflictTaskScalarWhereWithAggregatesInput[]
    NOT?: ConflictTaskScalarWhereWithAggregatesInput | ConflictTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConflictTask"> | string
    conflictId?: StringWithAggregatesFilter<"ConflictTask"> | string
    eventId?: StringWithAggregatesFilter<"ConflictTask"> | string
    title?: StringWithAggregatesFilter<"ConflictTask"> | string
    startTime?: DateTimeWithAggregatesFilter<"ConflictTask"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"ConflictTask"> | Date | string
    displayStart?: IntWithAggregatesFilter<"ConflictTask"> | number
    displayEnd?: IntWithAggregatesFilter<"ConflictTask"> | number
    relativeStart?: IntWithAggregatesFilter<"ConflictTask"> | number
    relativeEnd?: IntWithAggregatesFilter<"ConflictTask"> | number
    taskType?: EnumTaskTypeWithAggregatesFilter<"ConflictTask"> | $Enums.TaskType
    priority?: EnumPriorityWithAggregatesFilter<"ConflictTask"> | $Enums.Priority
  }

  export type ConflictProposalWhereInput = {
    AND?: ConflictProposalWhereInput | ConflictProposalWhereInput[]
    OR?: ConflictProposalWhereInput[]
    NOT?: ConflictProposalWhereInput | ConflictProposalWhereInput[]
    id?: StringFilter<"ConflictProposal"> | string
    conflictId?: StringFilter<"ConflictProposal"> | string
    eventId?: StringFilter<"ConflictProposal"> | string
    title?: StringFilter<"ConflictProposal"> | string
    proposedStart?: DateTimeFilter<"ConflictProposal"> | Date | string
    proposedEnd?: DateTimeFilter<"ConflictProposal"> | Date | string
    displayStart?: IntFilter<"ConflictProposal"> | number
    displayEnd?: IntFilter<"ConflictProposal"> | number
    relativeStart?: IntFilter<"ConflictProposal"> | number
    relativeEnd?: IntFilter<"ConflictProposal"> | number
    taskType?: EnumTaskTypeFilter<"ConflictProposal"> | $Enums.TaskType
    reasoning?: StringFilter<"ConflictProposal"> | string
    conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>
  }

  export type ConflictProposalOrderByWithRelationInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    proposedStart?: SortOrder
    proposedEnd?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    reasoning?: SortOrder
    conflict?: ConflictOrderByWithRelationInput
  }

  export type ConflictProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConflictProposalWhereInput | ConflictProposalWhereInput[]
    OR?: ConflictProposalWhereInput[]
    NOT?: ConflictProposalWhereInput | ConflictProposalWhereInput[]
    conflictId?: StringFilter<"ConflictProposal"> | string
    eventId?: StringFilter<"ConflictProposal"> | string
    title?: StringFilter<"ConflictProposal"> | string
    proposedStart?: DateTimeFilter<"ConflictProposal"> | Date | string
    proposedEnd?: DateTimeFilter<"ConflictProposal"> | Date | string
    displayStart?: IntFilter<"ConflictProposal"> | number
    displayEnd?: IntFilter<"ConflictProposal"> | number
    relativeStart?: IntFilter<"ConflictProposal"> | number
    relativeEnd?: IntFilter<"ConflictProposal"> | number
    taskType?: EnumTaskTypeFilter<"ConflictProposal"> | $Enums.TaskType
    reasoning?: StringFilter<"ConflictProposal"> | string
    conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>
  }, "id">

  export type ConflictProposalOrderByWithAggregationInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    proposedStart?: SortOrder
    proposedEnd?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    reasoning?: SortOrder
    _count?: ConflictProposalCountOrderByAggregateInput
    _avg?: ConflictProposalAvgOrderByAggregateInput
    _max?: ConflictProposalMaxOrderByAggregateInput
    _min?: ConflictProposalMinOrderByAggregateInput
    _sum?: ConflictProposalSumOrderByAggregateInput
  }

  export type ConflictProposalScalarWhereWithAggregatesInput = {
    AND?: ConflictProposalScalarWhereWithAggregatesInput | ConflictProposalScalarWhereWithAggregatesInput[]
    OR?: ConflictProposalScalarWhereWithAggregatesInput[]
    NOT?: ConflictProposalScalarWhereWithAggregatesInput | ConflictProposalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConflictProposal"> | string
    conflictId?: StringWithAggregatesFilter<"ConflictProposal"> | string
    eventId?: StringWithAggregatesFilter<"ConflictProposal"> | string
    title?: StringWithAggregatesFilter<"ConflictProposal"> | string
    proposedStart?: DateTimeWithAggregatesFilter<"ConflictProposal"> | Date | string
    proposedEnd?: DateTimeWithAggregatesFilter<"ConflictProposal"> | Date | string
    displayStart?: IntWithAggregatesFilter<"ConflictProposal"> | number
    displayEnd?: IntWithAggregatesFilter<"ConflictProposal"> | number
    relativeStart?: IntWithAggregatesFilter<"ConflictProposal"> | number
    relativeEnd?: IntWithAggregatesFilter<"ConflictProposal"> | number
    taskType?: EnumTaskTypeWithAggregatesFilter<"ConflictProposal"> | $Enums.TaskType
    reasoning?: StringWithAggregatesFilter<"ConflictProposal"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    completed?: BoolFilter<"Task"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    completed?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    userId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    completed?: BoolFilter<"Task"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    completed?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    userId?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    completed?: BoolWithAggregatesFilter<"Task"> | boolean
  }

  export type MoodLogWhereInput = {
    AND?: MoodLogWhereInput | MoodLogWhereInput[]
    OR?: MoodLogWhereInput[]
    NOT?: MoodLogWhereInput | MoodLogWhereInput[]
    id?: StringFilter<"MoodLog"> | string
    userId?: StringFilter<"MoodLog"> | string
    mood?: StringFilter<"MoodLog"> | string
    createdAt?: DateTimeFilter<"MoodLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MoodLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MoodLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MoodLogWhereInput | MoodLogWhereInput[]
    OR?: MoodLogWhereInput[]
    NOT?: MoodLogWhereInput | MoodLogWhereInput[]
    userId?: StringFilter<"MoodLog"> | string
    mood?: StringFilter<"MoodLog"> | string
    createdAt?: DateTimeFilter<"MoodLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MoodLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
    _count?: MoodLogCountOrderByAggregateInput
    _max?: MoodLogMaxOrderByAggregateInput
    _min?: MoodLogMinOrderByAggregateInput
  }

  export type MoodLogScalarWhereWithAggregatesInput = {
    AND?: MoodLogScalarWhereWithAggregatesInput | MoodLogScalarWhereWithAggregatesInput[]
    OR?: MoodLogScalarWhereWithAggregatesInput[]
    NOT?: MoodLogScalarWhereWithAggregatesInput | MoodLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MoodLog"> | string
    userId?: StringWithAggregatesFilter<"MoodLog"> | string
    mood?: StringWithAggregatesFilter<"MoodLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MoodLog"> | Date | string
  }

  export type SleepLogWhereInput = {
    AND?: SleepLogWhereInput | SleepLogWhereInput[]
    OR?: SleepLogWhereInput[]
    NOT?: SleepLogWhereInput | SleepLogWhereInput[]
    id?: StringFilter<"SleepLog"> | string
    userId?: StringFilter<"SleepLog"> | string
    sleepTime?: StringFilter<"SleepLog"> | string
    wakeTime?: StringFilter<"SleepLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SleepLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sleepTime?: SortOrder
    wakeTime?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SleepLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: SleepLogWhereInput | SleepLogWhereInput[]
    OR?: SleepLogWhereInput[]
    NOT?: SleepLogWhereInput | SleepLogWhereInput[]
    sleepTime?: StringFilter<"SleepLog"> | string
    wakeTime?: StringFilter<"SleepLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type SleepLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sleepTime?: SortOrder
    wakeTime?: SortOrder
    _count?: SleepLogCountOrderByAggregateInput
    _max?: SleepLogMaxOrderByAggregateInput
    _min?: SleepLogMinOrderByAggregateInput
  }

  export type SleepLogScalarWhereWithAggregatesInput = {
    AND?: SleepLogScalarWhereWithAggregatesInput | SleepLogScalarWhereWithAggregatesInput[]
    OR?: SleepLogScalarWhereWithAggregatesInput[]
    NOT?: SleepLogScalarWhereWithAggregatesInput | SleepLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SleepLog"> | string
    userId?: StringWithAggregatesFilter<"SleepLog"> | string
    sleepTime?: StringWithAggregatesFilter<"SleepLog"> | string
    wakeTime?: StringWithAggregatesFilter<"SleepLog"> | string
  }

  export type BehaviorSummaryWhereInput = {
    AND?: BehaviorSummaryWhereInput | BehaviorSummaryWhereInput[]
    OR?: BehaviorSummaryWhereInput[]
    NOT?: BehaviorSummaryWhereInput | BehaviorSummaryWhereInput[]
    id?: StringFilter<"BehaviorSummary"> | string
    userId?: StringFilter<"BehaviorSummary"> | string
    summary?: JsonFilter<"BehaviorSummary">
    updatedAt?: DateTimeFilter<"BehaviorSummary"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BehaviorSummaryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    summary?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BehaviorSummaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: BehaviorSummaryWhereInput | BehaviorSummaryWhereInput[]
    OR?: BehaviorSummaryWhereInput[]
    NOT?: BehaviorSummaryWhereInput | BehaviorSummaryWhereInput[]
    summary?: JsonFilter<"BehaviorSummary">
    updatedAt?: DateTimeFilter<"BehaviorSummary"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type BehaviorSummaryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    summary?: SortOrder
    updatedAt?: SortOrder
    _count?: BehaviorSummaryCountOrderByAggregateInput
    _max?: BehaviorSummaryMaxOrderByAggregateInput
    _min?: BehaviorSummaryMinOrderByAggregateInput
  }

  export type BehaviorSummaryScalarWhereWithAggregatesInput = {
    AND?: BehaviorSummaryScalarWhereWithAggregatesInput | BehaviorSummaryScalarWhereWithAggregatesInput[]
    OR?: BehaviorSummaryScalarWhereWithAggregatesInput[]
    NOT?: BehaviorSummaryScalarWhereWithAggregatesInput | BehaviorSummaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BehaviorSummary"> | string
    userId?: StringWithAggregatesFilter<"BehaviorSummary"> | string
    summary?: JsonWithAggregatesFilter<"BehaviorSummary">
    updatedAt?: DateTimeWithAggregatesFilter<"BehaviorSummary"> | Date | string
  }

  export type PreferencesWhereInput = {
    AND?: PreferencesWhereInput | PreferencesWhereInput[]
    OR?: PreferencesWhereInput[]
    NOT?: PreferencesWhereInput | PreferencesWhereInput[]
    id?: StringFilter<"Preferences"> | string
    timezone?: StringFilter<"Preferences"> | string
    dateFormat?: StringFilter<"Preferences"> | string
    userId?: StringFilter<"Preferences"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PreferencesOrderByWithRelationInput = {
    id?: SortOrder
    timezone?: SortOrder
    dateFormat?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PreferencesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PreferencesWhereInput | PreferencesWhereInput[]
    OR?: PreferencesWhereInput[]
    NOT?: PreferencesWhereInput | PreferencesWhereInput[]
    timezone?: StringFilter<"Preferences"> | string
    dateFormat?: StringFilter<"Preferences"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type PreferencesOrderByWithAggregationInput = {
    id?: SortOrder
    timezone?: SortOrder
    dateFormat?: SortOrder
    userId?: SortOrder
    _count?: PreferencesCountOrderByAggregateInput
    _max?: PreferencesMaxOrderByAggregateInput
    _min?: PreferencesMinOrderByAggregateInput
  }

  export type PreferencesScalarWhereWithAggregatesInput = {
    AND?: PreferencesScalarWhereWithAggregatesInput | PreferencesScalarWhereWithAggregatesInput[]
    OR?: PreferencesScalarWhereWithAggregatesInput[]
    NOT?: PreferencesScalarWhereWithAggregatesInput | PreferencesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Preferences"> | string
    timezone?: StringWithAggregatesFilter<"Preferences"> | string
    dateFormat?: StringWithAggregatesFilter<"Preferences"> | string
    userId?: StringWithAggregatesFilter<"Preferences"> | string
  }

  export type AIToolsWhereInput = {
    AND?: AIToolsWhereInput | AIToolsWhereInput[]
    OR?: AIToolsWhereInput[]
    NOT?: AIToolsWhereInput | AIToolsWhereInput[]
    id?: StringFilter<"AITools"> | string
    userId?: StringFilter<"AITools"> | string
    toolType?: StringFilter<"AITools"> | string
    inputData?: JsonFilter<"AITools">
    outputData?: JsonFilter<"AITools">
    createdAt?: DateTimeFilter<"AITools"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AIToolsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    toolType?: SortOrder
    inputData?: SortOrder
    outputData?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AIToolsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIToolsWhereInput | AIToolsWhereInput[]
    OR?: AIToolsWhereInput[]
    NOT?: AIToolsWhereInput | AIToolsWhereInput[]
    userId?: StringFilter<"AITools"> | string
    toolType?: StringFilter<"AITools"> | string
    inputData?: JsonFilter<"AITools">
    outputData?: JsonFilter<"AITools">
    createdAt?: DateTimeFilter<"AITools"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AIToolsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    toolType?: SortOrder
    inputData?: SortOrder
    outputData?: SortOrder
    createdAt?: SortOrder
    _count?: AIToolsCountOrderByAggregateInput
    _max?: AIToolsMaxOrderByAggregateInput
    _min?: AIToolsMinOrderByAggregateInput
  }

  export type AIToolsScalarWhereWithAggregatesInput = {
    AND?: AIToolsScalarWhereWithAggregatesInput | AIToolsScalarWhereWithAggregatesInput[]
    OR?: AIToolsScalarWhereWithAggregatesInput[]
    NOT?: AIToolsScalarWhereWithAggregatesInput | AIToolsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AITools"> | string
    userId?: StringWithAggregatesFilter<"AITools"> | string
    toolType?: StringWithAggregatesFilter<"AITools"> | string
    inputData?: JsonWithAggregatesFilter<"AITools">
    outputData?: JsonWithAggregatesFilter<"AITools">
    createdAt?: DateTimeWithAggregatesFilter<"AITools"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    user: UserCreateNestedOneWithoutEventsInput
    conflictTasks?: ConflictTaskCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    userId: string
    conflictTasks?: ConflictTaskUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    conflictTasks?: ConflictTaskUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    conflictTasks?: ConflictTaskUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    userId: string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictCreateInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConflictsInput
    tasks?: ConflictTaskCreateNestedManyWithoutConflictInput
    proposals?: ConflictProposalCreateNestedManyWithoutConflictInput
  }

  export type ConflictUncheckedCreateInput = {
    id?: string
    userId: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    tasks?: ConflictTaskUncheckedCreateNestedManyWithoutConflictInput
    proposals?: ConflictProposalUncheckedCreateNestedManyWithoutConflictInput
  }

  export type ConflictUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConflictsNestedInput
    tasks?: ConflictTaskUpdateManyWithoutConflictNestedInput
    proposals?: ConflictProposalUpdateManyWithoutConflictNestedInput
  }

  export type ConflictUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: ConflictTaskUncheckedUpdateManyWithoutConflictNestedInput
    proposals?: ConflictProposalUncheckedUpdateManyWithoutConflictNestedInput
  }

  export type ConflictCreateManyInput = {
    id?: string
    userId: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type ConflictUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConflictUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConflictTaskCreateInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
    conflict: ConflictCreateNestedOneWithoutTasksInput
    event: EventCreateNestedOneWithoutConflictTasksInput
  }

  export type ConflictTaskUncheckedCreateInput = {
    id?: string
    conflictId: string
    eventId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    conflict?: ConflictUpdateOneRequiredWithoutTasksNestedInput
    event?: EventUpdateOneRequiredWithoutConflictTasksNestedInput
  }

  export type ConflictTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictTaskCreateManyInput = {
    id?: string
    conflictId: string
    eventId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictProposalCreateInput = {
    id?: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
    conflict: ConflictCreateNestedOneWithoutProposalsInput
  }

  export type ConflictProposalUncheckedCreateInput = {
    id?: string
    conflictId: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
  }

  export type ConflictProposalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
    conflict?: ConflictUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ConflictProposalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictProposalCreateManyInput = {
    id?: string
    conflictId: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
  }

  export type ConflictProposalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictProposalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    completed?: boolean
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    completed?: boolean
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    completed?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MoodLogCreateInput = {
    id?: string
    mood: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMoodsInput
  }

  export type MoodLogUncheckedCreateInput = {
    id?: string
    userId: string
    mood: string
    createdAt?: Date | string
  }

  export type MoodLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMoodsNestedInput
  }

  export type MoodLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodLogCreateManyInput = {
    id?: string
    userId: string
    mood: string
    createdAt?: Date | string
  }

  export type MoodLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SleepLogCreateInput = {
    id?: string
    sleepTime: string
    wakeTime: string
    user: UserCreateNestedOneWithoutSleepInput
  }

  export type SleepLogUncheckedCreateInput = {
    id?: string
    userId: string
    sleepTime: string
    wakeTime: string
  }

  export type SleepLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSleepNestedInput
  }

  export type SleepLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
  }

  export type SleepLogCreateManyInput = {
    id?: string
    userId: string
    sleepTime: string
    wakeTime: string
  }

  export type SleepLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
  }

  export type SleepLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BehaviorSummaryCreateInput = {
    id?: string
    summary: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBehaviorInput
  }

  export type BehaviorSummaryUncheckedCreateInput = {
    id?: string
    userId: string
    summary: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type BehaviorSummaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBehaviorNestedInput
  }

  export type BehaviorSummaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BehaviorSummaryCreateManyInput = {
    id?: string
    userId: string
    summary: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type BehaviorSummaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BehaviorSummaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferencesCreateInput = {
    id?: string
    timezone?: string
    dateFormat?: string
    user: UserCreateNestedOneWithoutPreferencesInput
  }

  export type PreferencesUncheckedCreateInput = {
    id?: string
    timezone?: string
    dateFormat?: string
    userId: string
  }

  export type PreferencesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type PreferencesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PreferencesCreateManyInput = {
    id?: string
    timezone?: string
    dateFormat?: string
    userId: string
  }

  export type PreferencesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
  }

  export type PreferencesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AIToolsCreateInput = {
    id?: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActionsInput
  }

  export type AIToolsUncheckedCreateInput = {
    id?: string
    userId: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIToolsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActionsNestedInput
  }

  export type AIToolsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIToolsCreateManyInput = {
    id?: string
    userId: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIToolsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIToolsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type MoodLogListRelationFilter = {
    every?: MoodLogWhereInput
    some?: MoodLogWhereInput
    none?: MoodLogWhereInput
  }

  export type SleepLogNullableScalarRelationFilter = {
    is?: SleepLogWhereInput | null
    isNot?: SleepLogWhereInput | null
  }

  export type BehaviorSummaryNullableScalarRelationFilter = {
    is?: BehaviorSummaryWhereInput | null
    isNot?: BehaviorSummaryWhereInput | null
  }

  export type PreferencesNullableScalarRelationFilter = {
    is?: PreferencesWhereInput | null
    isNot?: PreferencesWhereInput | null
  }

  export type AIToolsListRelationFilter = {
    every?: AIToolsWhereInput
    some?: AIToolsWhereInput
    none?: AIToolsWhereInput
  }

  export type ConflictListRelationFilter = {
    every?: ConflictWhereInput
    some?: ConflictWhereInput
    none?: ConflictWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MoodLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIToolsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConflictOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ConflictTaskListRelationFilter = {
    every?: ConflictTaskWhereInput
    some?: ConflictTaskWhereInput
    none?: ConflictTaskWhereInput
  }

  export type ConflictTaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    desc?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    recurringDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    color?: SortOrder
    colorName?: SortOrder
    textColor?: SortOrder
    userId?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    recurringDays?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    desc?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    color?: SortOrder
    colorName?: SortOrder
    textColor?: SortOrder
    userId?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    desc?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    color?: SortOrder
    colorName?: SortOrder
    textColor?: SortOrder
    userId?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    recurringDays?: SortOrder
  }

  export type EnumConflictStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConflictStatusFilter<$PrismaModel> | $Enums.ConflictStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConflictProposalListRelationFilter = {
    every?: ConflictProposalWhereInput
    some?: ConflictProposalWhereInput
    none?: ConflictProposalWhereInput
  }

  export type ConflictProposalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConflictCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    errorId?: SortOrder
    summary?: SortOrder
    analysis?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type ConflictMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    errorId?: SortOrder
    summary?: SortOrder
    analysis?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type ConflictMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    errorId?: SortOrder
    summary?: SortOrder
    analysis?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type EnumConflictStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConflictStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConflictStatusFilter<$PrismaModel>
    _max?: NestedEnumConflictStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }

  export type EnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type ConflictScalarRelationFilter = {
    is?: ConflictWhereInput
    isNot?: ConflictWhereInput
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type ConflictTaskCountOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    priority?: SortOrder
  }

  export type ConflictTaskAvgOrderByAggregateInput = {
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
  }

  export type ConflictTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    priority?: SortOrder
  }

  export type ConflictTaskMinOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    priority?: SortOrder
  }

  export type ConflictTaskSumOrderByAggregateInput = {
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }

  export type EnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type ConflictProposalCountOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    proposedStart?: SortOrder
    proposedEnd?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    reasoning?: SortOrder
  }

  export type ConflictProposalAvgOrderByAggregateInput = {
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
  }

  export type ConflictProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    proposedStart?: SortOrder
    proposedEnd?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    reasoning?: SortOrder
  }

  export type ConflictProposalMinOrderByAggregateInput = {
    id?: SortOrder
    conflictId?: SortOrder
    eventId?: SortOrder
    title?: SortOrder
    proposedStart?: SortOrder
    proposedEnd?: SortOrder
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
    taskType?: SortOrder
    reasoning?: SortOrder
  }

  export type ConflictProposalSumOrderByAggregateInput = {
    displayStart?: SortOrder
    displayEnd?: SortOrder
    relativeStart?: SortOrder
    relativeEnd?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    completed?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    completed?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    completed?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MoodLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
  }

  export type SleepLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sleepTime?: SortOrder
    wakeTime?: SortOrder
  }

  export type SleepLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sleepTime?: SortOrder
    wakeTime?: SortOrder
  }

  export type SleepLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sleepTime?: SortOrder
    wakeTime?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BehaviorSummaryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    summary?: SortOrder
    updatedAt?: SortOrder
  }

  export type BehaviorSummaryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    updatedAt?: SortOrder
  }

  export type BehaviorSummaryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PreferencesCountOrderByAggregateInput = {
    id?: SortOrder
    timezone?: SortOrder
    dateFormat?: SortOrder
    userId?: SortOrder
  }

  export type PreferencesMaxOrderByAggregateInput = {
    id?: SortOrder
    timezone?: SortOrder
    dateFormat?: SortOrder
    userId?: SortOrder
  }

  export type PreferencesMinOrderByAggregateInput = {
    id?: SortOrder
    timezone?: SortOrder
    dateFormat?: SortOrder
    userId?: SortOrder
  }

  export type AIToolsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    toolType?: SortOrder
    inputData?: SortOrder
    outputData?: SortOrder
    createdAt?: SortOrder
  }

  export type AIToolsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    toolType?: SortOrder
    createdAt?: SortOrder
  }

  export type AIToolsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    toolType?: SortOrder
    createdAt?: SortOrder
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type MoodLogCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput> | MoodLogCreateWithoutUserInput[] | MoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodLogCreateOrConnectWithoutUserInput | MoodLogCreateOrConnectWithoutUserInput[]
    createMany?: MoodLogCreateManyUserInputEnvelope
    connect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
  }

  export type SleepLogCreateNestedOneWithoutUserInput = {
    create?: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
    connectOrCreate?: SleepLogCreateOrConnectWithoutUserInput
    connect?: SleepLogWhereUniqueInput
  }

  export type BehaviorSummaryCreateNestedOneWithoutUserInput = {
    create?: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
    connectOrCreate?: BehaviorSummaryCreateOrConnectWithoutUserInput
    connect?: BehaviorSummaryWhereUniqueInput
  }

  export type PreferencesCreateNestedOneWithoutUserInput = {
    create?: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: PreferencesCreateOrConnectWithoutUserInput
    connect?: PreferencesWhereUniqueInput
  }

  export type AIToolsCreateNestedManyWithoutUserInput = {
    create?: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput> | AIToolsCreateWithoutUserInput[] | AIToolsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIToolsCreateOrConnectWithoutUserInput | AIToolsCreateOrConnectWithoutUserInput[]
    createMany?: AIToolsCreateManyUserInputEnvelope
    connect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
  }

  export type ConflictCreateNestedManyWithoutUserInput = {
    create?: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput> | ConflictCreateWithoutUserInput[] | ConflictUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConflictCreateOrConnectWithoutUserInput | ConflictCreateOrConnectWithoutUserInput[]
    createMany?: ConflictCreateManyUserInputEnvelope
    connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type MoodLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput> | MoodLogCreateWithoutUserInput[] | MoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodLogCreateOrConnectWithoutUserInput | MoodLogCreateOrConnectWithoutUserInput[]
    createMany?: MoodLogCreateManyUserInputEnvelope
    connect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
  }

  export type SleepLogUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
    connectOrCreate?: SleepLogCreateOrConnectWithoutUserInput
    connect?: SleepLogWhereUniqueInput
  }

  export type BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
    connectOrCreate?: BehaviorSummaryCreateOrConnectWithoutUserInput
    connect?: BehaviorSummaryWhereUniqueInput
  }

  export type PreferencesUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: PreferencesCreateOrConnectWithoutUserInput
    connect?: PreferencesWhereUniqueInput
  }

  export type AIToolsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput> | AIToolsCreateWithoutUserInput[] | AIToolsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIToolsCreateOrConnectWithoutUserInput | AIToolsCreateOrConnectWithoutUserInput[]
    createMany?: AIToolsCreateManyUserInputEnvelope
    connect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
  }

  export type ConflictUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput> | ConflictCreateWithoutUserInput[] | ConflictUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConflictCreateOrConnectWithoutUserInput | ConflictCreateOrConnectWithoutUserInput[]
    createMany?: ConflictCreateManyUserInputEnvelope
    connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type MoodLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput> | MoodLogCreateWithoutUserInput[] | MoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodLogCreateOrConnectWithoutUserInput | MoodLogCreateOrConnectWithoutUserInput[]
    upsert?: MoodLogUpsertWithWhereUniqueWithoutUserInput | MoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodLogCreateManyUserInputEnvelope
    set?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    disconnect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    delete?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    connect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    update?: MoodLogUpdateWithWhereUniqueWithoutUserInput | MoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodLogUpdateManyWithWhereWithoutUserInput | MoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodLogScalarWhereInput | MoodLogScalarWhereInput[]
  }

  export type SleepLogUpdateOneWithoutUserNestedInput = {
    create?: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
    connectOrCreate?: SleepLogCreateOrConnectWithoutUserInput
    upsert?: SleepLogUpsertWithoutUserInput
    disconnect?: SleepLogWhereInput | boolean
    delete?: SleepLogWhereInput | boolean
    connect?: SleepLogWhereUniqueInput
    update?: XOR<XOR<SleepLogUpdateToOneWithWhereWithoutUserInput, SleepLogUpdateWithoutUserInput>, SleepLogUncheckedUpdateWithoutUserInput>
  }

  export type BehaviorSummaryUpdateOneWithoutUserNestedInput = {
    create?: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
    connectOrCreate?: BehaviorSummaryCreateOrConnectWithoutUserInput
    upsert?: BehaviorSummaryUpsertWithoutUserInput
    disconnect?: BehaviorSummaryWhereInput | boolean
    delete?: BehaviorSummaryWhereInput | boolean
    connect?: BehaviorSummaryWhereUniqueInput
    update?: XOR<XOR<BehaviorSummaryUpdateToOneWithWhereWithoutUserInput, BehaviorSummaryUpdateWithoutUserInput>, BehaviorSummaryUncheckedUpdateWithoutUserInput>
  }

  export type PreferencesUpdateOneWithoutUserNestedInput = {
    create?: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: PreferencesCreateOrConnectWithoutUserInput
    upsert?: PreferencesUpsertWithoutUserInput
    disconnect?: PreferencesWhereInput | boolean
    delete?: PreferencesWhereInput | boolean
    connect?: PreferencesWhereUniqueInput
    update?: XOR<XOR<PreferencesUpdateToOneWithWhereWithoutUserInput, PreferencesUpdateWithoutUserInput>, PreferencesUncheckedUpdateWithoutUserInput>
  }

  export type AIToolsUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput> | AIToolsCreateWithoutUserInput[] | AIToolsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIToolsCreateOrConnectWithoutUserInput | AIToolsCreateOrConnectWithoutUserInput[]
    upsert?: AIToolsUpsertWithWhereUniqueWithoutUserInput | AIToolsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIToolsCreateManyUserInputEnvelope
    set?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    disconnect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    delete?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    connect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    update?: AIToolsUpdateWithWhereUniqueWithoutUserInput | AIToolsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIToolsUpdateManyWithWhereWithoutUserInput | AIToolsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIToolsScalarWhereInput | AIToolsScalarWhereInput[]
  }

  export type ConflictUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput> | ConflictCreateWithoutUserInput[] | ConflictUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConflictCreateOrConnectWithoutUserInput | ConflictCreateOrConnectWithoutUserInput[]
    upsert?: ConflictUpsertWithWhereUniqueWithoutUserInput | ConflictUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConflictCreateManyUserInputEnvelope
    set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    update?: ConflictUpdateWithWhereUniqueWithoutUserInput | ConflictUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConflictUpdateManyWithWhereWithoutUserInput | ConflictUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type MoodLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput> | MoodLogCreateWithoutUserInput[] | MoodLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodLogCreateOrConnectWithoutUserInput | MoodLogCreateOrConnectWithoutUserInput[]
    upsert?: MoodLogUpsertWithWhereUniqueWithoutUserInput | MoodLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodLogCreateManyUserInputEnvelope
    set?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    disconnect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    delete?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    connect?: MoodLogWhereUniqueInput | MoodLogWhereUniqueInput[]
    update?: MoodLogUpdateWithWhereUniqueWithoutUserInput | MoodLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodLogUpdateManyWithWhereWithoutUserInput | MoodLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodLogScalarWhereInput | MoodLogScalarWhereInput[]
  }

  export type SleepLogUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
    connectOrCreate?: SleepLogCreateOrConnectWithoutUserInput
    upsert?: SleepLogUpsertWithoutUserInput
    disconnect?: SleepLogWhereInput | boolean
    delete?: SleepLogWhereInput | boolean
    connect?: SleepLogWhereUniqueInput
    update?: XOR<XOR<SleepLogUpdateToOneWithWhereWithoutUserInput, SleepLogUpdateWithoutUserInput>, SleepLogUncheckedUpdateWithoutUserInput>
  }

  export type BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
    connectOrCreate?: BehaviorSummaryCreateOrConnectWithoutUserInput
    upsert?: BehaviorSummaryUpsertWithoutUserInput
    disconnect?: BehaviorSummaryWhereInput | boolean
    delete?: BehaviorSummaryWhereInput | boolean
    connect?: BehaviorSummaryWhereUniqueInput
    update?: XOR<XOR<BehaviorSummaryUpdateToOneWithWhereWithoutUserInput, BehaviorSummaryUpdateWithoutUserInput>, BehaviorSummaryUncheckedUpdateWithoutUserInput>
  }

  export type PreferencesUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
    connectOrCreate?: PreferencesCreateOrConnectWithoutUserInput
    upsert?: PreferencesUpsertWithoutUserInput
    disconnect?: PreferencesWhereInput | boolean
    delete?: PreferencesWhereInput | boolean
    connect?: PreferencesWhereUniqueInput
    update?: XOR<XOR<PreferencesUpdateToOneWithWhereWithoutUserInput, PreferencesUpdateWithoutUserInput>, PreferencesUncheckedUpdateWithoutUserInput>
  }

  export type AIToolsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput> | AIToolsCreateWithoutUserInput[] | AIToolsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIToolsCreateOrConnectWithoutUserInput | AIToolsCreateOrConnectWithoutUserInput[]
    upsert?: AIToolsUpsertWithWhereUniqueWithoutUserInput | AIToolsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIToolsCreateManyUserInputEnvelope
    set?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    disconnect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    delete?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    connect?: AIToolsWhereUniqueInput | AIToolsWhereUniqueInput[]
    update?: AIToolsUpdateWithWhereUniqueWithoutUserInput | AIToolsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIToolsUpdateManyWithWhereWithoutUserInput | AIToolsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIToolsScalarWhereInput | AIToolsScalarWhereInput[]
  }

  export type ConflictUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput> | ConflictCreateWithoutUserInput[] | ConflictUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConflictCreateOrConnectWithoutUserInput | ConflictCreateOrConnectWithoutUserInput[]
    upsert?: ConflictUpsertWithWhereUniqueWithoutUserInput | ConflictUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConflictCreateManyUserInputEnvelope
    set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[]
    update?: ConflictUpdateWithWhereUniqueWithoutUserInput | ConflictUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConflictUpdateManyWithWhereWithoutUserInput | ConflictUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[]
  }

  export type EventCreaterecurringDaysInput = {
    set: number[]
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type ConflictTaskCreateNestedManyWithoutEventInput = {
    create?: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput> | ConflictTaskCreateWithoutEventInput[] | ConflictTaskUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutEventInput | ConflictTaskCreateOrConnectWithoutEventInput[]
    createMany?: ConflictTaskCreateManyEventInputEnvelope
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
  }

  export type ConflictTaskUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput> | ConflictTaskCreateWithoutEventInput[] | ConflictTaskUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutEventInput | ConflictTaskCreateOrConnectWithoutEventInput[]
    createMany?: ConflictTaskCreateManyEventInputEnvelope
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
  }

  export type EventUpdaterecurringDaysInput = {
    set?: number[]
    push?: number | number[]
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type ConflictTaskUpdateManyWithoutEventNestedInput = {
    create?: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput> | ConflictTaskCreateWithoutEventInput[] | ConflictTaskUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutEventInput | ConflictTaskCreateOrConnectWithoutEventInput[]
    upsert?: ConflictTaskUpsertWithWhereUniqueWithoutEventInput | ConflictTaskUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ConflictTaskCreateManyEventInputEnvelope
    set?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    disconnect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    delete?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    update?: ConflictTaskUpdateWithWhereUniqueWithoutEventInput | ConflictTaskUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ConflictTaskUpdateManyWithWhereWithoutEventInput | ConflictTaskUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
  }

  export type ConflictTaskUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput> | ConflictTaskCreateWithoutEventInput[] | ConflictTaskUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutEventInput | ConflictTaskCreateOrConnectWithoutEventInput[]
    upsert?: ConflictTaskUpsertWithWhereUniqueWithoutEventInput | ConflictTaskUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ConflictTaskCreateManyEventInputEnvelope
    set?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    disconnect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    delete?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    update?: ConflictTaskUpdateWithWhereUniqueWithoutEventInput | ConflictTaskUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ConflictTaskUpdateManyWithWhereWithoutEventInput | ConflictTaskUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConflictsInput = {
    create?: XOR<UserCreateWithoutConflictsInput, UserUncheckedCreateWithoutConflictsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConflictsInput
    connect?: UserWhereUniqueInput
  }

  export type ConflictTaskCreateNestedManyWithoutConflictInput = {
    create?: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput> | ConflictTaskCreateWithoutConflictInput[] | ConflictTaskUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutConflictInput | ConflictTaskCreateOrConnectWithoutConflictInput[]
    createMany?: ConflictTaskCreateManyConflictInputEnvelope
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
  }

  export type ConflictProposalCreateNestedManyWithoutConflictInput = {
    create?: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput> | ConflictProposalCreateWithoutConflictInput[] | ConflictProposalUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictProposalCreateOrConnectWithoutConflictInput | ConflictProposalCreateOrConnectWithoutConflictInput[]
    createMany?: ConflictProposalCreateManyConflictInputEnvelope
    connect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
  }

  export type ConflictTaskUncheckedCreateNestedManyWithoutConflictInput = {
    create?: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput> | ConflictTaskCreateWithoutConflictInput[] | ConflictTaskUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutConflictInput | ConflictTaskCreateOrConnectWithoutConflictInput[]
    createMany?: ConflictTaskCreateManyConflictInputEnvelope
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
  }

  export type ConflictProposalUncheckedCreateNestedManyWithoutConflictInput = {
    create?: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput> | ConflictProposalCreateWithoutConflictInput[] | ConflictProposalUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictProposalCreateOrConnectWithoutConflictInput | ConflictProposalCreateOrConnectWithoutConflictInput[]
    createMany?: ConflictProposalCreateManyConflictInputEnvelope
    connect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
  }

  export type EnumConflictStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConflictStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutConflictsNestedInput = {
    create?: XOR<UserCreateWithoutConflictsInput, UserUncheckedCreateWithoutConflictsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConflictsInput
    upsert?: UserUpsertWithoutConflictsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConflictsInput, UserUpdateWithoutConflictsInput>, UserUncheckedUpdateWithoutConflictsInput>
  }

  export type ConflictTaskUpdateManyWithoutConflictNestedInput = {
    create?: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput> | ConflictTaskCreateWithoutConflictInput[] | ConflictTaskUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutConflictInput | ConflictTaskCreateOrConnectWithoutConflictInput[]
    upsert?: ConflictTaskUpsertWithWhereUniqueWithoutConflictInput | ConflictTaskUpsertWithWhereUniqueWithoutConflictInput[]
    createMany?: ConflictTaskCreateManyConflictInputEnvelope
    set?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    disconnect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    delete?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    update?: ConflictTaskUpdateWithWhereUniqueWithoutConflictInput | ConflictTaskUpdateWithWhereUniqueWithoutConflictInput[]
    updateMany?: ConflictTaskUpdateManyWithWhereWithoutConflictInput | ConflictTaskUpdateManyWithWhereWithoutConflictInput[]
    deleteMany?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
  }

  export type ConflictProposalUpdateManyWithoutConflictNestedInput = {
    create?: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput> | ConflictProposalCreateWithoutConflictInput[] | ConflictProposalUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictProposalCreateOrConnectWithoutConflictInput | ConflictProposalCreateOrConnectWithoutConflictInput[]
    upsert?: ConflictProposalUpsertWithWhereUniqueWithoutConflictInput | ConflictProposalUpsertWithWhereUniqueWithoutConflictInput[]
    createMany?: ConflictProposalCreateManyConflictInputEnvelope
    set?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    disconnect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    delete?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    connect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    update?: ConflictProposalUpdateWithWhereUniqueWithoutConflictInput | ConflictProposalUpdateWithWhereUniqueWithoutConflictInput[]
    updateMany?: ConflictProposalUpdateManyWithWhereWithoutConflictInput | ConflictProposalUpdateManyWithWhereWithoutConflictInput[]
    deleteMany?: ConflictProposalScalarWhereInput | ConflictProposalScalarWhereInput[]
  }

  export type ConflictTaskUncheckedUpdateManyWithoutConflictNestedInput = {
    create?: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput> | ConflictTaskCreateWithoutConflictInput[] | ConflictTaskUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictTaskCreateOrConnectWithoutConflictInput | ConflictTaskCreateOrConnectWithoutConflictInput[]
    upsert?: ConflictTaskUpsertWithWhereUniqueWithoutConflictInput | ConflictTaskUpsertWithWhereUniqueWithoutConflictInput[]
    createMany?: ConflictTaskCreateManyConflictInputEnvelope
    set?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    disconnect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    delete?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    connect?: ConflictTaskWhereUniqueInput | ConflictTaskWhereUniqueInput[]
    update?: ConflictTaskUpdateWithWhereUniqueWithoutConflictInput | ConflictTaskUpdateWithWhereUniqueWithoutConflictInput[]
    updateMany?: ConflictTaskUpdateManyWithWhereWithoutConflictInput | ConflictTaskUpdateManyWithWhereWithoutConflictInput[]
    deleteMany?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
  }

  export type ConflictProposalUncheckedUpdateManyWithoutConflictNestedInput = {
    create?: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput> | ConflictProposalCreateWithoutConflictInput[] | ConflictProposalUncheckedCreateWithoutConflictInput[]
    connectOrCreate?: ConflictProposalCreateOrConnectWithoutConflictInput | ConflictProposalCreateOrConnectWithoutConflictInput[]
    upsert?: ConflictProposalUpsertWithWhereUniqueWithoutConflictInput | ConflictProposalUpsertWithWhereUniqueWithoutConflictInput[]
    createMany?: ConflictProposalCreateManyConflictInputEnvelope
    set?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    disconnect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    delete?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    connect?: ConflictProposalWhereUniqueInput | ConflictProposalWhereUniqueInput[]
    update?: ConflictProposalUpdateWithWhereUniqueWithoutConflictInput | ConflictProposalUpdateWithWhereUniqueWithoutConflictInput[]
    updateMany?: ConflictProposalUpdateManyWithWhereWithoutConflictInput | ConflictProposalUpdateManyWithWhereWithoutConflictInput[]
    deleteMany?: ConflictProposalScalarWhereInput | ConflictProposalScalarWhereInput[]
  }

  export type ConflictCreateNestedOneWithoutTasksInput = {
    create?: XOR<ConflictCreateWithoutTasksInput, ConflictUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ConflictCreateOrConnectWithoutTasksInput
    connect?: ConflictWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutConflictTasksInput = {
    create?: XOR<EventCreateWithoutConflictTasksInput, EventUncheckedCreateWithoutConflictTasksInput>
    connectOrCreate?: EventCreateOrConnectWithoutConflictTasksInput
    connect?: EventWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTaskTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskType
  }

  export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority
  }

  export type ConflictUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<ConflictCreateWithoutTasksInput, ConflictUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ConflictCreateOrConnectWithoutTasksInput
    upsert?: ConflictUpsertWithoutTasksInput
    connect?: ConflictWhereUniqueInput
    update?: XOR<XOR<ConflictUpdateToOneWithWhereWithoutTasksInput, ConflictUpdateWithoutTasksInput>, ConflictUncheckedUpdateWithoutTasksInput>
  }

  export type EventUpdateOneRequiredWithoutConflictTasksNestedInput = {
    create?: XOR<EventCreateWithoutConflictTasksInput, EventUncheckedCreateWithoutConflictTasksInput>
    connectOrCreate?: EventCreateOrConnectWithoutConflictTasksInput
    upsert?: EventUpsertWithoutConflictTasksInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutConflictTasksInput, EventUpdateWithoutConflictTasksInput>, EventUncheckedUpdateWithoutConflictTasksInput>
  }

  export type ConflictCreateNestedOneWithoutProposalsInput = {
    create?: XOR<ConflictCreateWithoutProposalsInput, ConflictUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: ConflictCreateOrConnectWithoutProposalsInput
    connect?: ConflictWhereUniqueInput
  }

  export type ConflictUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<ConflictCreateWithoutProposalsInput, ConflictUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: ConflictCreateOrConnectWithoutProposalsInput
    upsert?: ConflictUpsertWithoutProposalsInput
    connect?: ConflictWhereUniqueInput
    update?: XOR<XOR<ConflictUpdateToOneWithWhereWithoutProposalsInput, ConflictUpdateWithoutProposalsInput>, ConflictUncheckedUpdateWithoutProposalsInput>
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutMoodsInput = {
    create?: XOR<UserCreateWithoutMoodsInput, UserUncheckedCreateWithoutMoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMoodsNestedInput = {
    create?: XOR<UserCreateWithoutMoodsInput, UserUncheckedCreateWithoutMoodsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodsInput
    upsert?: UserUpsertWithoutMoodsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMoodsInput, UserUpdateWithoutMoodsInput>, UserUncheckedUpdateWithoutMoodsInput>
  }

  export type UserCreateNestedOneWithoutSleepInput = {
    create?: XOR<UserCreateWithoutSleepInput, UserUncheckedCreateWithoutSleepInput>
    connectOrCreate?: UserCreateOrConnectWithoutSleepInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSleepNestedInput = {
    create?: XOR<UserCreateWithoutSleepInput, UserUncheckedCreateWithoutSleepInput>
    connectOrCreate?: UserCreateOrConnectWithoutSleepInput
    upsert?: UserUpsertWithoutSleepInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSleepInput, UserUpdateWithoutSleepInput>, UserUncheckedUpdateWithoutSleepInput>
  }

  export type UserCreateNestedOneWithoutBehaviorInput = {
    create?: XOR<UserCreateWithoutBehaviorInput, UserUncheckedCreateWithoutBehaviorInput>
    connectOrCreate?: UserCreateOrConnectWithoutBehaviorInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBehaviorNestedInput = {
    create?: XOR<UserCreateWithoutBehaviorInput, UserUncheckedCreateWithoutBehaviorInput>
    connectOrCreate?: UserCreateOrConnectWithoutBehaviorInput
    upsert?: UserUpsertWithoutBehaviorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBehaviorInput, UserUpdateWithoutBehaviorInput>, UserUncheckedUpdateWithoutBehaviorInput>
  }

  export type UserCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    upsert?: UserUpsertWithoutPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPreferencesInput, UserUpdateWithoutPreferencesInput>, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserCreateNestedOneWithoutActionsInput = {
    create?: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionsInput
    upsert?: UserUpsertWithoutActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionsInput, UserUpdateWithoutActionsInput>, UserUncheckedUpdateWithoutActionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumConflictStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConflictStatusFilter<$PrismaModel> | $Enums.ConflictStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConflictStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConflictStatusFilter<$PrismaModel>
    _max?: NestedEnumConflictStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeFilter<$PrismaModel> | $Enums.TaskType
  }

  export type NestedEnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskType | EnumTaskTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskType[] | ListEnumTaskTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskTypeWithAggregatesFilter<$PrismaModel> | $Enums.TaskType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskTypeFilter<$PrismaModel>
    _max?: NestedEnumTaskTypeFilter<$PrismaModel>
  }

  export type NestedEnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EventCreateWithoutUserInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    conflictTasks?: ConflictTaskCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    conflictTasks?: ConflictTaskUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    completed?: boolean
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    completed?: boolean
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MoodLogCreateWithoutUserInput = {
    id?: string
    mood: string
    createdAt?: Date | string
  }

  export type MoodLogUncheckedCreateWithoutUserInput = {
    id?: string
    mood: string
    createdAt?: Date | string
  }

  export type MoodLogCreateOrConnectWithoutUserInput = {
    where: MoodLogWhereUniqueInput
    create: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput>
  }

  export type MoodLogCreateManyUserInputEnvelope = {
    data: MoodLogCreateManyUserInput | MoodLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SleepLogCreateWithoutUserInput = {
    id?: string
    sleepTime: string
    wakeTime: string
  }

  export type SleepLogUncheckedCreateWithoutUserInput = {
    id?: string
    sleepTime: string
    wakeTime: string
  }

  export type SleepLogCreateOrConnectWithoutUserInput = {
    where: SleepLogWhereUniqueInput
    create: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
  }

  export type BehaviorSummaryCreateWithoutUserInput = {
    id?: string
    summary: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type BehaviorSummaryUncheckedCreateWithoutUserInput = {
    id?: string
    summary: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type BehaviorSummaryCreateOrConnectWithoutUserInput = {
    where: BehaviorSummaryWhereUniqueInput
    create: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
  }

  export type PreferencesCreateWithoutUserInput = {
    id?: string
    timezone?: string
    dateFormat?: string
  }

  export type PreferencesUncheckedCreateWithoutUserInput = {
    id?: string
    timezone?: string
    dateFormat?: string
  }

  export type PreferencesCreateOrConnectWithoutUserInput = {
    where: PreferencesWhereUniqueInput
    create: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
  }

  export type AIToolsCreateWithoutUserInput = {
    id?: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIToolsUncheckedCreateWithoutUserInput = {
    id?: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AIToolsCreateOrConnectWithoutUserInput = {
    where: AIToolsWhereUniqueInput
    create: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput>
  }

  export type AIToolsCreateManyUserInputEnvelope = {
    data: AIToolsCreateManyUserInput | AIToolsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConflictCreateWithoutUserInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    tasks?: ConflictTaskCreateNestedManyWithoutConflictInput
    proposals?: ConflictProposalCreateNestedManyWithoutConflictInput
  }

  export type ConflictUncheckedCreateWithoutUserInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    tasks?: ConflictTaskUncheckedCreateNestedManyWithoutConflictInput
    proposals?: ConflictProposalUncheckedCreateNestedManyWithoutConflictInput
  }

  export type ConflictCreateOrConnectWithoutUserInput = {
    where: ConflictWhereUniqueInput
    create: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput>
  }

  export type ConflictCreateManyUserInputEnvelope = {
    data: ConflictCreateManyUserInput | ConflictCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    desc?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    recurringDays?: IntNullableListFilter<"Event">
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    color?: StringFilter<"Event"> | string
    colorName?: StringFilter<"Event"> | string
    textColor?: StringFilter<"Event"> | string
    userId?: StringFilter<"Event"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    userId?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    completed?: BoolFilter<"Task"> | boolean
  }

  export type MoodLogUpsertWithWhereUniqueWithoutUserInput = {
    where: MoodLogWhereUniqueInput
    update: XOR<MoodLogUpdateWithoutUserInput, MoodLogUncheckedUpdateWithoutUserInput>
    create: XOR<MoodLogCreateWithoutUserInput, MoodLogUncheckedCreateWithoutUserInput>
  }

  export type MoodLogUpdateWithWhereUniqueWithoutUserInput = {
    where: MoodLogWhereUniqueInput
    data: XOR<MoodLogUpdateWithoutUserInput, MoodLogUncheckedUpdateWithoutUserInput>
  }

  export type MoodLogUpdateManyWithWhereWithoutUserInput = {
    where: MoodLogScalarWhereInput
    data: XOR<MoodLogUpdateManyMutationInput, MoodLogUncheckedUpdateManyWithoutUserInput>
  }

  export type MoodLogScalarWhereInput = {
    AND?: MoodLogScalarWhereInput | MoodLogScalarWhereInput[]
    OR?: MoodLogScalarWhereInput[]
    NOT?: MoodLogScalarWhereInput | MoodLogScalarWhereInput[]
    id?: StringFilter<"MoodLog"> | string
    userId?: StringFilter<"MoodLog"> | string
    mood?: StringFilter<"MoodLog"> | string
    createdAt?: DateTimeFilter<"MoodLog"> | Date | string
  }

  export type SleepLogUpsertWithoutUserInput = {
    update: XOR<SleepLogUpdateWithoutUserInput, SleepLogUncheckedUpdateWithoutUserInput>
    create: XOR<SleepLogCreateWithoutUserInput, SleepLogUncheckedCreateWithoutUserInput>
    where?: SleepLogWhereInput
  }

  export type SleepLogUpdateToOneWithWhereWithoutUserInput = {
    where?: SleepLogWhereInput
    data: XOR<SleepLogUpdateWithoutUserInput, SleepLogUncheckedUpdateWithoutUserInput>
  }

  export type SleepLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
  }

  export type SleepLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sleepTime?: StringFieldUpdateOperationsInput | string
    wakeTime?: StringFieldUpdateOperationsInput | string
  }

  export type BehaviorSummaryUpsertWithoutUserInput = {
    update: XOR<BehaviorSummaryUpdateWithoutUserInput, BehaviorSummaryUncheckedUpdateWithoutUserInput>
    create: XOR<BehaviorSummaryCreateWithoutUserInput, BehaviorSummaryUncheckedCreateWithoutUserInput>
    where?: BehaviorSummaryWhereInput
  }

  export type BehaviorSummaryUpdateToOneWithWhereWithoutUserInput = {
    where?: BehaviorSummaryWhereInput
    data: XOR<BehaviorSummaryUpdateWithoutUserInput, BehaviorSummaryUncheckedUpdateWithoutUserInput>
  }

  export type BehaviorSummaryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BehaviorSummaryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferencesUpsertWithoutUserInput = {
    update: XOR<PreferencesUpdateWithoutUserInput, PreferencesUncheckedUpdateWithoutUserInput>
    create: XOR<PreferencesCreateWithoutUserInput, PreferencesUncheckedCreateWithoutUserInput>
    where?: PreferencesWhereInput
  }

  export type PreferencesUpdateToOneWithWhereWithoutUserInput = {
    where?: PreferencesWhereInput
    data: XOR<PreferencesUpdateWithoutUserInput, PreferencesUncheckedUpdateWithoutUserInput>
  }

  export type PreferencesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
  }

  export type PreferencesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
  }

  export type AIToolsUpsertWithWhereUniqueWithoutUserInput = {
    where: AIToolsWhereUniqueInput
    update: XOR<AIToolsUpdateWithoutUserInput, AIToolsUncheckedUpdateWithoutUserInput>
    create: XOR<AIToolsCreateWithoutUserInput, AIToolsUncheckedCreateWithoutUserInput>
  }

  export type AIToolsUpdateWithWhereUniqueWithoutUserInput = {
    where: AIToolsWhereUniqueInput
    data: XOR<AIToolsUpdateWithoutUserInput, AIToolsUncheckedUpdateWithoutUserInput>
  }

  export type AIToolsUpdateManyWithWhereWithoutUserInput = {
    where: AIToolsScalarWhereInput
    data: XOR<AIToolsUpdateManyMutationInput, AIToolsUncheckedUpdateManyWithoutUserInput>
  }

  export type AIToolsScalarWhereInput = {
    AND?: AIToolsScalarWhereInput | AIToolsScalarWhereInput[]
    OR?: AIToolsScalarWhereInput[]
    NOT?: AIToolsScalarWhereInput | AIToolsScalarWhereInput[]
    id?: StringFilter<"AITools"> | string
    userId?: StringFilter<"AITools"> | string
    toolType?: StringFilter<"AITools"> | string
    inputData?: JsonFilter<"AITools">
    outputData?: JsonFilter<"AITools">
    createdAt?: DateTimeFilter<"AITools"> | Date | string
  }

  export type ConflictUpsertWithWhereUniqueWithoutUserInput = {
    where: ConflictWhereUniqueInput
    update: XOR<ConflictUpdateWithoutUserInput, ConflictUncheckedUpdateWithoutUserInput>
    create: XOR<ConflictCreateWithoutUserInput, ConflictUncheckedCreateWithoutUserInput>
  }

  export type ConflictUpdateWithWhereUniqueWithoutUserInput = {
    where: ConflictWhereUniqueInput
    data: XOR<ConflictUpdateWithoutUserInput, ConflictUncheckedUpdateWithoutUserInput>
  }

  export type ConflictUpdateManyWithWhereWithoutUserInput = {
    where: ConflictScalarWhereInput
    data: XOR<ConflictUpdateManyMutationInput, ConflictUncheckedUpdateManyWithoutUserInput>
  }

  export type ConflictScalarWhereInput = {
    AND?: ConflictScalarWhereInput | ConflictScalarWhereInput[]
    OR?: ConflictScalarWhereInput[]
    NOT?: ConflictScalarWhereInput | ConflictScalarWhereInput[]
    id?: StringFilter<"Conflict"> | string
    userId?: StringFilter<"Conflict"> | string
    errorId?: StringFilter<"Conflict"> | string
    summary?: StringFilter<"Conflict"> | string
    analysis?: StringFilter<"Conflict"> | string
    status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus
    detectedAt?: DateTimeFilter<"Conflict"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Conflict"> | Date | string | null
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type ConflictTaskCreateWithoutEventInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
    conflict: ConflictCreateNestedOneWithoutTasksInput
  }

  export type ConflictTaskUncheckedCreateWithoutEventInput = {
    id?: string
    conflictId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictTaskCreateOrConnectWithoutEventInput = {
    where: ConflictTaskWhereUniqueInput
    create: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput>
  }

  export type ConflictTaskCreateManyEventInputEnvelope = {
    data: ConflictTaskCreateManyEventInput | ConflictTaskCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConflictTaskUpsertWithWhereUniqueWithoutEventInput = {
    where: ConflictTaskWhereUniqueInput
    update: XOR<ConflictTaskUpdateWithoutEventInput, ConflictTaskUncheckedUpdateWithoutEventInput>
    create: XOR<ConflictTaskCreateWithoutEventInput, ConflictTaskUncheckedCreateWithoutEventInput>
  }

  export type ConflictTaskUpdateWithWhereUniqueWithoutEventInput = {
    where: ConflictTaskWhereUniqueInput
    data: XOR<ConflictTaskUpdateWithoutEventInput, ConflictTaskUncheckedUpdateWithoutEventInput>
  }

  export type ConflictTaskUpdateManyWithWhereWithoutEventInput = {
    where: ConflictTaskScalarWhereInput
    data: XOR<ConflictTaskUpdateManyMutationInput, ConflictTaskUncheckedUpdateManyWithoutEventInput>
  }

  export type ConflictTaskScalarWhereInput = {
    AND?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
    OR?: ConflictTaskScalarWhereInput[]
    NOT?: ConflictTaskScalarWhereInput | ConflictTaskScalarWhereInput[]
    id?: StringFilter<"ConflictTask"> | string
    conflictId?: StringFilter<"ConflictTask"> | string
    eventId?: StringFilter<"ConflictTask"> | string
    title?: StringFilter<"ConflictTask"> | string
    startTime?: DateTimeFilter<"ConflictTask"> | Date | string
    endTime?: DateTimeFilter<"ConflictTask"> | Date | string
    displayStart?: IntFilter<"ConflictTask"> | number
    displayEnd?: IntFilter<"ConflictTask"> | number
    relativeStart?: IntFilter<"ConflictTask"> | number
    relativeEnd?: IntFilter<"ConflictTask"> | number
    taskType?: EnumTaskTypeFilter<"ConflictTask"> | $Enums.TaskType
    priority?: EnumPriorityFilter<"ConflictTask"> | $Enums.Priority
  }

  export type UserCreateWithoutConflictsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConflictsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConflictsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConflictsInput, UserUncheckedCreateWithoutConflictsInput>
  }

  export type ConflictTaskCreateWithoutConflictInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
    event: EventCreateNestedOneWithoutConflictTasksInput
  }

  export type ConflictTaskUncheckedCreateWithoutConflictInput = {
    id?: string
    eventId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictTaskCreateOrConnectWithoutConflictInput = {
    where: ConflictTaskWhereUniqueInput
    create: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput>
  }

  export type ConflictTaskCreateManyConflictInputEnvelope = {
    data: ConflictTaskCreateManyConflictInput | ConflictTaskCreateManyConflictInput[]
    skipDuplicates?: boolean
  }

  export type ConflictProposalCreateWithoutConflictInput = {
    id?: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
  }

  export type ConflictProposalUncheckedCreateWithoutConflictInput = {
    id?: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
  }

  export type ConflictProposalCreateOrConnectWithoutConflictInput = {
    where: ConflictProposalWhereUniqueInput
    create: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput>
  }

  export type ConflictProposalCreateManyConflictInputEnvelope = {
    data: ConflictProposalCreateManyConflictInput | ConflictProposalCreateManyConflictInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConflictsInput = {
    update: XOR<UserUpdateWithoutConflictsInput, UserUncheckedUpdateWithoutConflictsInput>
    create: XOR<UserCreateWithoutConflictsInput, UserUncheckedCreateWithoutConflictsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConflictsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConflictsInput, UserUncheckedUpdateWithoutConflictsInput>
  }

  export type UserUpdateWithoutConflictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConflictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConflictTaskUpsertWithWhereUniqueWithoutConflictInput = {
    where: ConflictTaskWhereUniqueInput
    update: XOR<ConflictTaskUpdateWithoutConflictInput, ConflictTaskUncheckedUpdateWithoutConflictInput>
    create: XOR<ConflictTaskCreateWithoutConflictInput, ConflictTaskUncheckedCreateWithoutConflictInput>
  }

  export type ConflictTaskUpdateWithWhereUniqueWithoutConflictInput = {
    where: ConflictTaskWhereUniqueInput
    data: XOR<ConflictTaskUpdateWithoutConflictInput, ConflictTaskUncheckedUpdateWithoutConflictInput>
  }

  export type ConflictTaskUpdateManyWithWhereWithoutConflictInput = {
    where: ConflictTaskScalarWhereInput
    data: XOR<ConflictTaskUpdateManyMutationInput, ConflictTaskUncheckedUpdateManyWithoutConflictInput>
  }

  export type ConflictProposalUpsertWithWhereUniqueWithoutConflictInput = {
    where: ConflictProposalWhereUniqueInput
    update: XOR<ConflictProposalUpdateWithoutConflictInput, ConflictProposalUncheckedUpdateWithoutConflictInput>
    create: XOR<ConflictProposalCreateWithoutConflictInput, ConflictProposalUncheckedCreateWithoutConflictInput>
  }

  export type ConflictProposalUpdateWithWhereUniqueWithoutConflictInput = {
    where: ConflictProposalWhereUniqueInput
    data: XOR<ConflictProposalUpdateWithoutConflictInput, ConflictProposalUncheckedUpdateWithoutConflictInput>
  }

  export type ConflictProposalUpdateManyWithWhereWithoutConflictInput = {
    where: ConflictProposalScalarWhereInput
    data: XOR<ConflictProposalUpdateManyMutationInput, ConflictProposalUncheckedUpdateManyWithoutConflictInput>
  }

  export type ConflictProposalScalarWhereInput = {
    AND?: ConflictProposalScalarWhereInput | ConflictProposalScalarWhereInput[]
    OR?: ConflictProposalScalarWhereInput[]
    NOT?: ConflictProposalScalarWhereInput | ConflictProposalScalarWhereInput[]
    id?: StringFilter<"ConflictProposal"> | string
    conflictId?: StringFilter<"ConflictProposal"> | string
    eventId?: StringFilter<"ConflictProposal"> | string
    title?: StringFilter<"ConflictProposal"> | string
    proposedStart?: DateTimeFilter<"ConflictProposal"> | Date | string
    proposedEnd?: DateTimeFilter<"ConflictProposal"> | Date | string
    displayStart?: IntFilter<"ConflictProposal"> | number
    displayEnd?: IntFilter<"ConflictProposal"> | number
    relativeStart?: IntFilter<"ConflictProposal"> | number
    relativeEnd?: IntFilter<"ConflictProposal"> | number
    taskType?: EnumTaskTypeFilter<"ConflictProposal"> | $Enums.TaskType
    reasoning?: StringFilter<"ConflictProposal"> | string
  }

  export type ConflictCreateWithoutTasksInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConflictsInput
    proposals?: ConflictProposalCreateNestedManyWithoutConflictInput
  }

  export type ConflictUncheckedCreateWithoutTasksInput = {
    id?: string
    userId: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    proposals?: ConflictProposalUncheckedCreateNestedManyWithoutConflictInput
  }

  export type ConflictCreateOrConnectWithoutTasksInput = {
    where: ConflictWhereUniqueInput
    create: XOR<ConflictCreateWithoutTasksInput, ConflictUncheckedCreateWithoutTasksInput>
  }

  export type EventCreateWithoutConflictTasksInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutConflictTasksInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
    userId: string
  }

  export type EventCreateOrConnectWithoutConflictTasksInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutConflictTasksInput, EventUncheckedCreateWithoutConflictTasksInput>
  }

  export type ConflictUpsertWithoutTasksInput = {
    update: XOR<ConflictUpdateWithoutTasksInput, ConflictUncheckedUpdateWithoutTasksInput>
    create: XOR<ConflictCreateWithoutTasksInput, ConflictUncheckedCreateWithoutTasksInput>
    where?: ConflictWhereInput
  }

  export type ConflictUpdateToOneWithWhereWithoutTasksInput = {
    where?: ConflictWhereInput
    data: XOR<ConflictUpdateWithoutTasksInput, ConflictUncheckedUpdateWithoutTasksInput>
  }

  export type ConflictUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConflictsNestedInput
    proposals?: ConflictProposalUpdateManyWithoutConflictNestedInput
  }

  export type ConflictUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proposals?: ConflictProposalUncheckedUpdateManyWithoutConflictNestedInput
  }

  export type EventUpsertWithoutConflictTasksInput = {
    update: XOR<EventUpdateWithoutConflictTasksInput, EventUncheckedUpdateWithoutConflictTasksInput>
    create: XOR<EventCreateWithoutConflictTasksInput, EventUncheckedCreateWithoutConflictTasksInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutConflictTasksInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutConflictTasksInput, EventUncheckedUpdateWithoutConflictTasksInput>
  }

  export type EventUpdateWithoutConflictTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutConflictTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictCreateWithoutProposalsInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    user: UserCreateNestedOneWithoutConflictsInput
    tasks?: ConflictTaskCreateNestedManyWithoutConflictInput
  }

  export type ConflictUncheckedCreateWithoutProposalsInput = {
    id?: string
    userId: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    tasks?: ConflictTaskUncheckedCreateNestedManyWithoutConflictInput
  }

  export type ConflictCreateOrConnectWithoutProposalsInput = {
    where: ConflictWhereUniqueInput
    create: XOR<ConflictCreateWithoutProposalsInput, ConflictUncheckedCreateWithoutProposalsInput>
  }

  export type ConflictUpsertWithoutProposalsInput = {
    update: XOR<ConflictUpdateWithoutProposalsInput, ConflictUncheckedUpdateWithoutProposalsInput>
    create: XOR<ConflictCreateWithoutProposalsInput, ConflictUncheckedCreateWithoutProposalsInput>
    where?: ConflictWhereInput
  }

  export type ConflictUpdateToOneWithWhereWithoutProposalsInput = {
    where?: ConflictWhereInput
    data: XOR<ConflictUpdateWithoutProposalsInput, ConflictUncheckedUpdateWithoutProposalsInput>
  }

  export type ConflictUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutConflictsNestedInput
    tasks?: ConflictTaskUpdateManyWithoutConflictNestedInput
  }

  export type ConflictUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: ConflictTaskUncheckedUpdateManyWithoutConflictNestedInput
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMoodsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMoodsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMoodsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMoodsInput, UserUncheckedCreateWithoutMoodsInput>
  }

  export type UserUpsertWithoutMoodsInput = {
    update: XOR<UserUpdateWithoutMoodsInput, UserUncheckedUpdateWithoutMoodsInput>
    create: XOR<UserCreateWithoutMoodsInput, UserUncheckedCreateWithoutMoodsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMoodsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMoodsInput, UserUncheckedUpdateWithoutMoodsInput>
  }

  export type UserUpdateWithoutMoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSleepInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSleepInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSleepInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSleepInput, UserUncheckedCreateWithoutSleepInput>
  }

  export type UserUpsertWithoutSleepInput = {
    update: XOR<UserUpdateWithoutSleepInput, UserUncheckedUpdateWithoutSleepInput>
    create: XOR<UserCreateWithoutSleepInput, UserUncheckedCreateWithoutSleepInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSleepInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSleepInput, UserUncheckedUpdateWithoutSleepInput>
  }

  export type UserUpdateWithoutSleepInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSleepInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBehaviorInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBehaviorInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBehaviorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBehaviorInput, UserUncheckedCreateWithoutBehaviorInput>
  }

  export type UserUpsertWithoutBehaviorInput = {
    update: XOR<UserUpdateWithoutBehaviorInput, UserUncheckedUpdateWithoutBehaviorInput>
    create: XOR<UserCreateWithoutBehaviorInput, UserUncheckedCreateWithoutBehaviorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBehaviorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBehaviorInput, UserUncheckedUpdateWithoutBehaviorInput>
  }

  export type UserUpdateWithoutBehaviorInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBehaviorInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPreferencesInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    actions?: AIToolsCreateNestedManyWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPreferencesInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    actions?: AIToolsUncheckedCreateNestedManyWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
  }

  export type UserUpsertWithoutPreferencesInput = {
    update: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    actions?: AIToolsUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    actions?: AIToolsUncheckedUpdateManyWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActionsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    moods?: MoodLogCreateNestedManyWithoutUserInput
    sleep?: SleepLogCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryCreateNestedOneWithoutUserInput
    preferences?: PreferencesCreateNestedOneWithoutUserInput
    conflicts?: ConflictCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionsInput = {
    id?: string
    googleId?: string | null
    password?: string | null
    avatar?: string | null
    email: string
    name?: string | null
    username?: string | null
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    moods?: MoodLogUncheckedCreateNestedManyWithoutUserInput
    sleep?: SleepLogUncheckedCreateNestedOneWithoutUserInput
    behavior?: BehaviorSummaryUncheckedCreateNestedOneWithoutUserInput
    preferences?: PreferencesUncheckedCreateNestedOneWithoutUserInput
    conflicts?: ConflictUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
  }

  export type UserUpsertWithoutActionsInput = {
    update: XOR<UserUpdateWithoutActionsInput, UserUncheckedUpdateWithoutActionsInput>
    create: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionsInput, UserUncheckedUpdateWithoutActionsInput>
  }

  export type UserUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    moods?: MoodLogUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUpdateOneWithoutUserNestedInput
    conflicts?: ConflictUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    moods?: MoodLogUncheckedUpdateManyWithoutUserNestedInput
    sleep?: SleepLogUncheckedUpdateOneWithoutUserNestedInput
    behavior?: BehaviorSummaryUncheckedUpdateOneWithoutUserNestedInput
    preferences?: PreferencesUncheckedUpdateOneWithoutUserNestedInput
    conflicts?: ConflictUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventCreateManyUserInput = {
    id?: string
    title: string
    location?: string | null
    desc?: string | null
    startTime: Date | string
    endTime: Date | string
    recurringDays?: EventCreaterecurringDaysInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    color: string
    colorName: string
    textColor: string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    completed?: boolean
  }

  export type MoodLogCreateManyUserInput = {
    id?: string
    mood: string
    createdAt?: Date | string
  }

  export type AIToolsCreateManyUserInput = {
    id?: string
    toolType: string
    inputData: JsonNullValueInput | InputJsonValue
    outputData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ConflictCreateManyUserInput = {
    id?: string
    errorId: string
    summary: string
    analysis: string
    status?: $Enums.ConflictStatus
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type EventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    conflictTasks?: ConflictTaskUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
    conflictTasks?: ConflictTaskUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    recurringDays?: EventUpdaterecurringDaysInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    color?: StringFieldUpdateOperationsInput | string
    colorName?: StringFieldUpdateOperationsInput | string
    textColor?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MoodLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIToolsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIToolsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIToolsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toolType?: StringFieldUpdateOperationsInput | string
    inputData?: JsonNullValueInput | InputJsonValue
    outputData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConflictUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: ConflictTaskUpdateManyWithoutConflictNestedInput
    proposals?: ConflictProposalUpdateManyWithoutConflictNestedInput
  }

  export type ConflictUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: ConflictTaskUncheckedUpdateManyWithoutConflictNestedInput
    proposals?: ConflictProposalUncheckedUpdateManyWithoutConflictNestedInput
  }

  export type ConflictUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    errorId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    analysis?: StringFieldUpdateOperationsInput | string
    status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConflictTaskCreateManyEventInput = {
    id?: string
    conflictId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictTaskUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    conflict?: ConflictUpdateOneRequiredWithoutTasksNestedInput
  }

  export type ConflictTaskUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictTaskUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    conflictId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictTaskCreateManyConflictInput = {
    id?: string
    eventId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType?: $Enums.TaskType
    priority?: $Enums.Priority
  }

  export type ConflictProposalCreateManyConflictInput = {
    id?: string
    eventId: string
    title: string
    proposedStart: Date | string
    proposedEnd: Date | string
    displayStart: number
    displayEnd: number
    relativeStart: number
    relativeEnd: number
    taskType: $Enums.TaskType
    reasoning: string
  }

  export type ConflictTaskUpdateWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    event?: EventUpdateOneRequiredWithoutConflictTasksNestedInput
  }

  export type ConflictTaskUncheckedUpdateWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictTaskUncheckedUpdateManyWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
  }

  export type ConflictProposalUpdateWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictProposalUncheckedUpdateWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }

  export type ConflictProposalUncheckedUpdateManyWithoutConflictInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    proposedStart?: DateTimeFieldUpdateOperationsInput | Date | string
    proposedEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    displayStart?: IntFieldUpdateOperationsInput | number
    displayEnd?: IntFieldUpdateOperationsInput | number
    relativeStart?: IntFieldUpdateOperationsInput | number
    relativeEnd?: IntFieldUpdateOperationsInput | number
    taskType?: EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType
    reasoning?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}