import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from './useDebounce.ts';
import { searchMembers, searchTeams } from "../api/mockApi";
import type { AssignMode } from "../types"

export function useAssignees(mode: AssignMode) {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500)


  const { data = [], isLoading } = useQuery({
    queryKey: ['assignees', mode, debouncedSearch],
    queryFn: () =>
      mode === 'members'
        ? searchMembers(debouncedSearch)
        : searchTeams(debouncedSearch),
   })
 return {
    search, 
    setSearch,
    results: data,
    isLoading,
 }
}