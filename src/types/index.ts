export interface Member {
  id: string
  name: string
}

export interface Team {
  id: string
  name: string
}

export interface Tag {
  id: string
  label: string
  color: string
}

export interface Topic {
  id: string
  label: string
}
export type AssignMode = 'members' | 'teams'

export interface TaskFormValues {
  context: string 
  assignMode: AssignMode
  isRoutine: boolean
  routinePeriod: string
  routineDescription: string
  assignees: string[]
  dueData: string
  topic: string
  tags: string[]
  files: FileList | null
}

