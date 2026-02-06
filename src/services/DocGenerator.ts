import fs from 'fs';
import path from 'path';

/**
 * Basic Documentation Generator for plugins
 * Scans the plugin's source code and extracts metadata/comments
 */
export class DocGenerator {
    /**
     * Generate markdown documentation for a plugin
     */
    public static async generate(pluginPath: string): Promise<string> {
        let docs = '# API Reference\n\n';
        
        const indexPath = path.join(pluginPath, 'index.ts');
        if (!fs.existsSync(indexPath)) {
            return docs + '_No index.ts found to generate documentation._';
        }

        const content = fs.readFileSync(indexPath, 'utf-8');
        
        // Very basic extraction of JSDoc comments for methods/exports
        const jsDocMatches = content.match(/\/\*\*[\s\S]*?\*\/[\s\S]*?(?:export\s+)?(?:class|function|const|let)\s+(\w+)/g);

        if (jsDocMatches) {
            jsDocMatches.forEach(match => {
                const comment = match.match(/\/\*\*([\s\S]*?)\*\//)?.[1] || '';
                const name = match.match(/(?:class|function|const|let)\s+(\w+)/)?.[1] || 'Unknown';
                
                const cleanComment = comment
                    .split('\n')
                    .map(line => line.trim().replace(/^\* ?/, ''))
                    .filter(line => line.length > 0)
                    .join('\n');

                docs += `## ${name}\n${cleanComment}\n\n`;
            });
        } else {
            docs += '_No annotated exports found._\n';
        }

        return docs;
    }
}
