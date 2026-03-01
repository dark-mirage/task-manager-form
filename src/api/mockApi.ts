import { MOCK_MEMBERS, MOCK_TEAMS } from "../constants/mockData";
import type { Member, Team, TaskFormValues } from "../types";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export const searchMembers = async (query: string): Promise<Member[]> => {
  await delay(400)
  if (!query) return MOCK_MEMBERS
  return MOCK_MEMBERS.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase())
  )
}

export const searchTeams = async (query: string): Promise<Team[]> => {
  await delay(400)
  if (!query) return MOCK_TEAMS
  return MOCK_TEAMS.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )
}

export const submitTaskForm = async (data: TaskFormValues): Promise<{ success: boolean}> => {
  await delay(600)
  console.log('Task submitted:', data)
  return { success: true}
}

