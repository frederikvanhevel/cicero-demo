import { create } from 'zustand'

interface FormState {
    answers: {
        [key: string]: any
    }
    currentStep: number
    setAnswer: (questionId: string, value: any) => void
    setCurrentStep: (step: number) => void
    reset: () => void
}

export const useFormStore = create<FormState>((set) => ({
    answers: {},
    currentStep: 0,
    setAnswer: (questionId, value) =>
        set((state) => ({
            answers: { ...state.answers, [questionId]: value }
        })),
    setCurrentStep: (step) => set({ currentStep: step }),
    reset: () => set({ answers: {}, currentStep: 0 })
}))
