import { HttpException, Injectable ,Logger} from '@nestjs/common';
import { OtherEntity } from './entitys/OtherEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUpdateDto } from 'src/auth/dtos/creat_update.dto';


@Injectable()
export class OtherService {

  constructor(
    @InjectRepository(OtherEntity)
    private readonly otherRepository: Repository<OtherEntity>,
  ) {
     Logger.log("OtherService --初始化");
  }
/**
 * Returns a test string for other module input
 * @returns {string} The test string 'inputOtherTest'
 */
  inputOtherTest(){
    return 'inputOtherTest'
  }
  /**
   * Creates and saves a new Other entity with the provided name
   * @param name - The name to assign to the new entity
   * @returns The saved entity if successful, or a message prompting for input if name is empty
   */
  async inputOther(name: string){
    if(name){
      let saveModel =  await this.otherRepository.save({
        name: name,
      })

      
      if(saveModel){
        return saveModel
      }
    }else{
      return '请输入name'
    }
  }
async updateOther(id:number ,name: string){
    if(id && name){
      let upModel =  await this.otherRepository.update(id,{
        name: name,
      })
      if(upModel){
        return upModel
      }


      //  return this.otherRepository
      // .createQueryBuilder()
      // .update(OtherEntity)
      // .set({ name:"888" })
      // .where('name = :name', { name })
      // .execute();

    }else{
      return '请输入id 和 name'
    }
  }


   async updateOtherBySql(id: number, name: string) {
     console.log("params - id", id)
      console.log("params - name", name)
    const result = await this.otherRepository.query(
      `UPDATE other SET name = ${name} WHERE id = ${id}`
    );
    return { affected: result?.affected || 0 };
  }

}
