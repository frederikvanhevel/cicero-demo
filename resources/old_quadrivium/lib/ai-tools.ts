/**
 * AI function tools
 * This module defines the function tools that can be used by AI agents
 */

import {
    clearExecutionSteps,
    getExecutionSteps,
    logStep,
    writeExecutionStepsToFile
} from './logging'

/**
 * Function tool definitions for AI agents
 */
export const functionTools = [
    {
        name: 'log_step',
        description:
            'Log an execution step that will be included in the final result.txt file. Use this to track important steps in your reasoning or execution process.',
        parameters: {
            type: 'object',
            properties: {
                step: {
                    type: 'string',
                    description:
                        'The execution step to log. Should be concise but descriptive.'
                }
            },
            required: ['step']
        }
    },
    {
        name: 'get_execution_steps',
        description: 'Get all previously logged execution steps.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'clear_execution_steps',
        description: 'Clear all previously logged execution steps.',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'write_steps_to_result',
        description:
            'Write all logged execution steps to result.txt file. Can include additional content as the main result.',
        parameters: {
            type: 'object',
            properties: {
                additional_content: {
                    type: 'string',
                    description:
                        'Additional content to include at the beginning of the result.txt file before the execution steps.'
                }
            },
            required: []
        }
    }
]

/**
 * Function implementations mapping for AI tool calls
 */
export const functionImplementations: Record<string, Function> = {
    log_step: async (args: { step: string }) => {
        logStep(args.step)
        return { result: `Logged step: ${args.step}` }
    },

    get_execution_steps: async () => {
        const steps = getExecutionSteps()
        return { result: steps }
    },

    clear_execution_steps: async () => {
        clearExecutionSteps()
        return { result: 'Execution steps cleared' }
    },

    write_steps_to_result: async (args: { additional_content?: string }) => {
        await writeExecutionStepsToFile(args.additional_content)
        return { result: 'Execution steps written to result.txt' }
    }
}
