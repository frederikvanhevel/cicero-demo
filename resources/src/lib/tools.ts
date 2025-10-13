/**
 * AI Agent tools interface
 * This module defines the interfaces and implementations for AI agent tools
 */

import {
    clearExecutionSteps,
    getExecutionSteps,
    logStep,
    writeExecutionStepsToFile
} from './logging'

/**
 * Interface for the log_step tool
 */
export interface LogStepTool {
    name: 'log_step'
    description: 'Log an execution step that will be included in the final result.txt file. Use this to track important steps in your reasoning or execution process.'
    parameters: {
        type: 'object'
        properties: {
            step: {
                type: 'string'
                description: 'The execution step to log. Should be concise but descriptive.'
            }
        }
        required: ['step']
    }
}

/**
 * Interface for the get_execution_steps tool
 */
export interface GetExecutionStepsTool {
    name: 'get_execution_steps'
    description: 'Get all previously logged execution steps.'
    parameters: {
        type: 'object'
        properties: {}
        required: []
    }
}

/**
 * Interface for the clear_execution_steps tool
 */
export interface ClearExecutionStepsTool {
    name: 'clear_execution_steps'
    description: 'Clear all previously logged execution steps.'
    parameters: {
        type: 'object'
        properties: {}
        required: []
    }
}

/**
 * Interface for the write_steps_to_result tool
 */
export interface WriteStepsToResultTool {
    name: 'write_steps_to_result'
    description: 'Write all logged execution steps to result.txt file. Can include additional content as the main result.'
    parameters: {
        type: 'object'
        properties: {
            additional_content: {
                type: 'string'
                description: 'Additional content to include at the beginning of the result.txt file before the execution steps.'
            }
        }
        required: []
    }
}

/**
 * Implementation of the log_step tool
 */
export const logStepTool = async (args: { step: string }): Promise<string> => {
    logStep(args.step)
    return `Logged step: ${args.step}`
}

/**
 * Implementation of the get_execution_steps tool
 */
export const getExecutionStepsTool = async (): Promise<string[]> => {
    return getExecutionSteps()
}

/**
 * Implementation of the clear_execution_steps tool
 */
export const clearExecutionStepsTool = async (): Promise<string> => {
    clearExecutionSteps()
    return 'Execution steps cleared'
}

/**
 * Implementation of the write_steps_to_result tool
 */
export const writeStepsToResultTool = async (args: {
    additional_content?: string
}): Promise<string> => {
    await writeExecutionStepsToFile(args.additional_content)
    return 'Execution steps written to result.txt'
}
