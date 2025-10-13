/**
 * Execution steps logging utility
 * This module provides functions to log execution steps and write them to result.txt
 */

import fs from 'fs'

// Store execution steps
let executionSteps: string[] = []

/**
 * Log an execution step
 * @param step The step to log
 */
export function logStep(step: string): void {
    executionSteps.push(step)
}

/**
 * Get all logged execution steps
 * @returns Array of all execution steps
 */
export function getExecutionSteps(): string[] {
    return [...executionSteps]
}

/**
 * Get all logged execution steps as a formatted string
 * @param separator The separator between steps (default: '\n')
 * @returns Formatted string with all execution steps
 */
export function getFormattedExecutionSteps(separator: string = '\n'): string {
    return executionSteps.join(separator)
}

/**
 * Clear all logged execution steps
 */
export function clearExecutionSteps(): void {
    executionSteps = []
}

/**
 * Write execution steps to result.txt
 * @param additionalContent Optional additional content to include in the file
 */
export async function writeExecutionStepsToFile(
    additionalContent?: string
): Promise<void> {
    const content = additionalContent
        ? `${additionalContent}\n\n--- Execution Steps ---\n${getFormattedExecutionSteps()}`
        : getFormattedExecutionSteps()

    try {
        fs.writeFileSync('result.txt', content)
        console.log('Execution steps written to result.txt')
    } catch (error) {
        console.error('Error writing execution steps to result.txt:', error)
    }
}
