# Execution Logging Tools

This library provides tools for AI agents to log execution steps and write them to a result.txt file. This allows the final output to be clean while still preserving the step-by-step reasoning process.

## Available Tools

The following tools are available:

### log_step

Logs an execution step that will be included in the final result.txt file.

```typescript
// Example usage
const response = await logStepTool({ step: "Analyzed input data and found 3 entries" });
console.log(response); // "Logged step: Analyzed input data and found 3 entries"
```

### get_execution_steps

Gets all previously logged execution steps.

```typescript
// Example usage
const steps = await getExecutionStepsTool();
console.log(steps); // ["Step 1", "Step 2", ...]
```

### clear_execution_steps

Clears all previously logged execution steps.

```typescript
// Example usage
const response = await clearExecutionStepsTool();
console.log(response); // "Execution steps cleared"
```

### write_steps_to_result

Writes all logged execution steps to result.txt file. Can include additional content as the main result.

```typescript
// Example usage
const response = await writeStepsToResultTool({ 
  additional_content: "This is the final answer: The subject falls under ABS regulations."
});
console.log(response); // "Execution steps written to result.txt"
```

## Integration with AI Agents

When integrating with AI agents, you can simplify the instructions by telling the AI to:

1. Use `log_step` for each significant reasoning step
2. Generate a concise final answer
3. Use `write_steps_to_result` with the final answer as `additional_content`

This approach keeps the final output clean and focused while preserving the detailed reasoning steps for review.

## Example result.txt Output

```
This is the final answer: The subject falls under ABS regulations.

--- Execution Steps ---
1. Analyzed the definition of genetic resources under Nagoya Protocol
2. Checked if physical samples are within scope
3. Determined if digital sequence information is regulated
4. Verified the species origin and indigenous status
5. Checked for special categorizations under Brazilian law
6. Found that the material falls under ABS regulations due to criteria 1, 3, and 4
``` 