import * as _ from 'lodash';
import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export type TDocument<T> = T & Document;
export abstract class BaseAbstractRepository<T> {
  protected model: Model<TDocument<T>>;

  protected constructor(model: Model<TDocument<T>>) {
    this.model = model;
  }

  public async create(data: any, session?: ClientSession) {
    const newDocument = await new this.model(data).save({ session });
    return newDocument.toObject();
  }

  public async createDoc(data: T): Promise<TDocument<T>> {
    const newDocument = await new this.model(data).save();
    return newDocument as unknown as TDocument<T>;
  }

  async find(
    filterQuery: FilterQuery<TDocument<T>>,
    projection: Record<string, any> = {},
    options: QueryOptions = {},
  ): Promise<TDocument<T>[]> {
    return this.model
      .find(filterQuery, projection, options)
      .lean() as unknown as TDocument<T>[];
  }

  public async findOne(
    filterQuery: FilterQuery<TDocument<T>>,
    options: QueryOptions = {},
    projection: any = {},
  ): Promise<TDocument<T>> {
    return (await this.model
      .findOne(filterQuery, projection)
      .setOptions(options)
      .lean()) as TDocument<T>;
  }

  public async findAllWithPaginationOption(
    queryFiltersAndOptions: any,
    arrayOfFilters: string[],
    extraOptions = {},
  ): Promise<TDocument<T>[]> {
    const filters: FilterQuery<TDocument<T>> = _.pick(
      queryFiltersAndOptions,
      arrayOfFilters,
    );
    const options = _.pick(queryFiltersAndOptions, ['page', 'limit']);
    let docs;

    if (queryFiltersAndOptions.from || queryFiltersAndOptions.to) {
      (filters as any).createdAt = {};

      if (queryFiltersAndOptions.from) {
        filters.createdAt.$gte = new Date(queryFiltersAndOptions.from);
      }

      if (queryFiltersAndOptions.to) {
        filters.createdAt.$lt = new Date(queryFiltersAndOptions.to);
      }
    }

    if (queryFiltersAndOptions.allowPagination) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      docs = await this.model.paginate(filters, {
        ...options,
        ...extraOptions,
        collation: { locale: 'en', caseLevel: true, numericOrdering: true },
        lean: true,
        select: { ...extraOptions },
        sort: { createdAt: -1 },
      });
    } else {
      docs = await this.model
        .find(filters, { ...extraOptions })
        .setOptions({ ...options, ...extraOptions })
        .sort({ createdAt: -1 })
        .lean();

      docs = { docs };
    }
    return docs;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument<T>>,
    updateQuery: UpdateQuery<TDocument<T>>,
    options: QueryOptions = {},
    projection: any = {},
    session?: ClientSession,
  ): Promise<TDocument<T>> {
    return (await this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true, ...options })
      .lean()) as TDocument<T>;
  }

  public async deleteOne(
    filterQuery: FilterQuery<TDocument<T>>,
  ): Promise<void> {
    await this.model.deleteOne(filterQuery);
  }

  public async deleteMany(
    filterQuery: FilterQuery<TDocument<T>>,
    options?: any,
  ): Promise<void> {
    await this.model.deleteMany(filterQuery, options);
  }

  public async updateOne(
    filterQuery: FilterQuery<TDocument<T>>,
    updateQuery: UpdateQuery<TDocument<T>>,
    options?: any,
  ) {
    return await this.model.updateOne(filterQuery, updateQuery, { ...options });
  }

  public async updateOneVoid(
    filterQuery: FilterQuery<TDocument<T>>,
    updateQuery: UpdateQuery<TDocument<T>>,
    options?: any,
  ): Promise<void> {
    await this.model.updateOne(filterQuery, updateQuery, { ...options });
  }

  public async updateAllVoid(
    filterQuery: FilterQuery<TDocument<T>>,
    updateQuery: UpdateQuery<TDocument<T>>,
    options?: any,
  ): Promise<void> {
    await this.model.updateMany(filterQuery, updateQuery, options);
  }
}
