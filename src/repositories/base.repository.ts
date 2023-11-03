import { PaginateBaseDto } from '@dtos';
import { FindManyOptions, FindOneOptions, In } from 'typeorm';

export interface IRepository<T> {
  insert(input: T): T;

  insertMulti(input: T): T | T[];

  update(id: number, updateData: any);

  updateMulti(options: FindManyOptions, updateData: any): T;

  delete(input: string | number);

  findAll(options: FindManyOptions): T[];

  findById(id: number, relations: any): T;

  findByListId(listId: number[], relations: any): T[];

  findOne(options: FindOneOptions): T;

  paginate(options: any): Promise<PaginateBaseDto<T>>;
}

export abstract class AbstractMysqlRepository<T> implements IRepository<T> {
  constructor(private repository) {}

  insert(input: T | T[]) {
    return this.repository.save(input);
  }

  insertMulti(input: T | T[]): T[] {
    return this.repository.save(input);
  }

  async updateMapField(
    id: number | string,
    updateData: any,
    filterUpdate: string[] = [],
    forceUpdate: string[] = [],
  ): Promise<T> {
    const update = await this.repository.findOne({ where: { id: id } });
    Object.keys(update).map((field) => {
      if (filterUpdate.length && !filterUpdate.includes(field)) {
        return;
      }
      if (
        (updateData[field] || forceUpdate.includes(field)) &&
        update[field] != updateData[field]
      ) {
        update[field] = updateData[field] || null;
      }
    });
    const { affected } = await this.repository.update({ id: id }, update);
    if (!affected) {
      return null;
    }
    return update;
  }

  async updateOneMapField(
    option: FindOneOptions,
    updateData: any,
    filterUpdate: string[] = [],
  ): Promise<T> {
    const update = await this.repository.findOne(option);
    Object.keys(update).map((field) => {
      if (filterUpdate.length && !filterUpdate.includes(field)) {
        return;
      }
      if (updateData[field] && update[field] != updateData[field]) {
        update[field] = updateData[field];
      }
    });
    const { affected } = await this.repository.update(option, update);
    if (!affected) {
      return null;
    }
    return update;
  }

  update(findOptions: number | string | Record<string, any>, updateData: any) {
    return this.repository.update(findOptions, updateData);
  }

  updateMulti(option: FindManyOptions, updateData: any): T {
    return this.repository.update(option, updateData);
  }

  delete(id: number | string | Record<string, any>) {
    return this.repository.delete(id);
  }

  findAll(option: FindManyOptions): T[] {
    return this.repository.find(option);
  }

  findById(id: number | string, relations = []): T {
    return this.repository.findOne({
      where: { id },
      relations,
    });
  }

  findByListId(listIds: number[], relations = []): T[] {
    return this.repository.find({
      where: { id: In(listIds) },
      relations: relations,
    });
  }

  findOne(options: FindOneOptions): T {
    return this.repository.findOne(options);
  }

  async paginate(options: any): Promise<PaginateBaseDto<T>> {
    const { page = 1, size = 25 } = options.pagination || {};
    const result: PaginateBaseDto<T> = {
      docs: [],
      page: 1,
      size: 0,
      total: 0,
      totalPage: 1,
    };
    options.take = Number(size);
    options.skip = size * page - size;

    const [list, count] = await this.repository.findAndCount(options);
    result.total = count;
    result.docs = list;
    result.size = Number(size);
    result.page = Number(page);
    result.totalPage = Math.ceil(result.total / size);
    return result;
  }
}
