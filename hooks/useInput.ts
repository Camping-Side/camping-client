import { useState, useCallback } from "react";

function useInputs(initialForm: any) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setForm((form: any) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
