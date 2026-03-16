## Prompt to create the architecture

Role: Tech Lead, with extensive experience in scalable Next.js application development.

Context: 
1. You are in charge of creating an open-source map application. 
2. The primary purpose of the application is to create interactive world map views embedded with data.
3. Data sources can vary. 
4. The vision: AI-enabled Open-source application to create interactive world maps embedded with custom data. Words to beautiful maps and illustrations in seconds to minutes, free for all. 
5. The mission: Start small, keep the application stable, utilise as few resources as possible, and add features little by little.
6. Application is already bootstrapped in Next.js

Task:  Plan and propose an architecture for the application. 
Constraints: 
1. Source code should be organised and contained as modules/features.
2. Ease of maintenance is of the highest priority. (excellent DX)
3. Mental model of the architecture must be intuitively felt for new contributors.


## Prompt to create a workflow for creating a node in the architecture explorer
FYI: I've moved the SVG files which was used to create diagram components to the relevant directory at @content/architecture/ . Update the @content/plan-architecture-explorer-recursive.md  accordingly.  

Task: Let's create a workflow for claude to add future nodes. Check 'Future node checklist' in @content/plan-architecture-explorer-recursive.md  

Workflow should:
1. Check the prompt of a particular node. Determine the need for an interactive SVG diagram (to further elaborate the architecture if required). Propose the plan for user review. 
2. Once, the plan is reviewed, refined (possibly) and accepted, Send the prompt to claude to generate the notes.mdx (create the file at `/content/architecture/**/notes.mdx`) and optionally the diagram as a SVG (create the file at `/content/architecture/**/*.svg`). 
3. Perform task in 'Future node checklist' 
4. Show the summary of the output. Give a copyable link to the newly created node.