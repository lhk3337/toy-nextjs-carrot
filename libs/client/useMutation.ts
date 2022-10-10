import { useState } from "react";
interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prevState) => ({ ...prevState, loading: true }));
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prevState) => ({ ...prevState, data, loading: false })))
      .catch((error) => setState((prevState) => ({ ...prevState, error })));
  }
  // enter.tsx line 30 - enter(validForm);
  return [mutation, { ...state }];
}

/* 
issue
 .then((json) => setState((prevState) => ({ ...prevState, data: json })))
 .then((json) => setState({ ...state, data: json }))
 */
