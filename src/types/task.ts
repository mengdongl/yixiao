export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  projectName: string;
  // 任务组
  epicId: number;
  kanbanId: number;
  // bug or task
  typeId: number;
  note: string;
  ownerId?:number,
  status:number
}
