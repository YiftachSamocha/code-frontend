import { parseScript } from "esprima"
const EASY_OPEN = 'YIFTACH_IN_MOVEO'

function extractAndNormalizeFunctions(code) {
    try {
        const ast = parseScript(code, { range: true, comment: true })
        const functions = []

        function traverse(node) {
            if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
                const body = code.slice(node.body.range[0], node.body.range[1])
                const normalizedBody = body
                    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove comments
                    .replace(/console\.log\(.*?\);?/g, '') // Remove console.log
                    .replace(/(let|const|var) [^;]+;/g, '') // Remove variable declarations
                    .replace(/\s+/g, ' ') // Normalize spaces
                    .trim()
                functions.push(normalizedBody)
            }

            // Traverse child nodes
            for (const key in node) {
                if (node[key] && typeof node[key] === 'object') {
                    traverse(node[key])
                }
            }
        }

        traverse(ast)
        return functions
    } catch (error) {
        // Return an empty array if parsing fails
        return []
    }
}

export function compareFunctions(code1, code2) {
    // Check if either of the codes is the "EASY_OPEN" value, return true immediately
    if (code1 === EASY_OPEN || code2 === EASY_OPEN) return true

    try {
        // Extract and normalize functions from both code strings
        const functions1 = extractAndNormalizeFunctions(code1)
        const functions2 = extractAndNormalizeFunctions(code2)

        // If either code has no functions, return false
        if (!functions1.length || !functions2.length) {
            return false
        }

        // Compare each function from the first code with every function from the second code
        for (const func1 of functions1) {
            for (const func2 of functions2) {
                // If any function matches, return true
                if (func1 === func2) {
                    return true
                }
            }
        }
        // Return false if no matching functions were found
        return false
    } catch (error) {
        // Return false if there was an error during comparison
        return false
    }
}

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
