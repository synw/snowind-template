import { humanize } from "./services/str.js";

function createAwaiter<T = boolean>() {
    let resolveFn: (value: T) => void;
    let rejectFn: (reason?: any) => void;

    const promise = new Promise<T>((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });

    return {
        awaiter: promise,
        unblock: resolveFn!,
        reject: rejectFn!
    };
}

function transformTasksData(data: Record<string, string>): any[] {
    const result: any[] = [];
    // Group nodes are tracked in dedicated maps with namespaced keys so they can
    // never be confused with leaf nodes (whose keys are agent/feature names).
    const roots = new Map<string, any>();
    const secondLevels = new Map<string, any>();
    const thirdLevels = new Map<string, any>();

    for (const [key, value] of Object.entries(data)) {
        const parts = value.split('/');
        const [first, second, third] = parts;

        // Create root level
        let root = roots.get(first);
        if (!root) {
            root = { key: first, label: humanize(first), children: [] };
            roots.set(first, root);
            result.push(root);
        }

        // If only first level, add as child
        if (!second) {
            root.children.push({ key, label: humanize(key) });
            continue;
        }

        // Create second level
        const secondKey = `${first}/${second}`;
        let secondLevel = secondLevels.get(secondKey);
        if (!secondLevel) {
            secondLevel = { key: secondKey, label: humanize(second), children: [] };
            secondLevels.set(secondKey, secondLevel);
            root.children.push(secondLevel);
        }

        // Create third level if exists
        let parent = secondLevel;
        if (third) {
            const thirdKey = `${secondKey}/${third}`;
            let thirdLevel = thirdLevels.get(thirdKey);
            if (!thirdLevel) {
                thirdLevel = { key: thirdKey, label: humanize(third), children: [] };
                thirdLevels.set(thirdKey, thirdLevel);
                secondLevel.children.push(thirdLevel);
            }
            parent = thirdLevel;
        }
        // Direct child of the deepest group level
        parent.children.push({ key, label: humanize(key) });
    }

    sortNodes(result);
    return result;
}

function sortNodes(nodes: any[]): void {
    nodes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }) || a.key.localeCompare(b.key));
    for (const node of nodes) {
        if (node.children?.length) {
            sortNodes(node.children);
        }
    }
}

export {
    createAwaiter,
    transformTasksData
};
