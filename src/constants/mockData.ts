import type { Member, Team, Tag, Topic } from '../types'

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Аблямова Нигора' },
  { id: '2', name: 'Исроилов Жамшид' },
  { id: '3', name: 'Каримов Алишер' },
  { id: '4', name: 'Ганиев Сардор' },
]

export const MOCK_TEAMS: Team[] = [
  { id: 't1', name: 'Frontend Team' },
  { id: 't2', name: 'Backend Team' },
  { id: 't3', name: 'Design Team' },
  { id: 't4', name: 'QA Team' },
]

export const MOCK_TAGS: Tag[] = [
  { id: 'tag1', label: 'XL', color: 'orange' },
  { id: 'tag2', label: 'Очень важно', color: 'red' },
  { id: 'tag3', label: 'Срочно', color: 'purple' },
  { id: 'tag4', label: 'Баг', color: 'red' },
]

export const MOCK_TOPICS: Topic[] = [
  { id: 'topic1', label: 'Models' },
  { id: 'topic2', label: 'Design' },
  { id: 'topic3', label: 'Development' },
  { id: 'topic4', label: 'Testing' },
]

export const ROUTINE_PERIODS = [
  { value: 'daily', label: 'Ежедневно' },
  { value: 'weekly', label: 'Еженедельно' },
  { value: 'monthly', label: 'Ежемесячно' },
]

