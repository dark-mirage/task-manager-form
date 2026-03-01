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

