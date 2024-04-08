import { DivisionEntity } from '@/entities/divisions/DivisionEntity'


export interface DivisionRepository {
  getDivisions(): Promise<DivisionEntity[]>;
  
  getDivisionById(id: string): Promise<DivisionEntity | null>;
  
  createDivision(division: DivisionEntity): Promise<void>;
  
  updateDivision(id: string, division: DivisionEntity): Promise<void>;
  
  deleteDivision(id: string): Promise<void>;
}