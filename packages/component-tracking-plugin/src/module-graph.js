function traverseModuleGraph(rooteNormalModule, graphModuleMap, checkModuleCallback) {
    const visited = new Map();
    const traverse = (crtNode) => {
        if (visited.get(crtNode)) {
            return;
        }
        visited.set(crtNode, true);

        const correspondingGraphModule = graphModuleMap.get(crtNode);
        if (!correspondingGraphModule) return;

        checkModuleCallback(crtNode, correspondingGraphModule);

        const children = new Set(
            Array.from(
                correspondingGraphModule.outgoingConnections || [],
                (c) => c.module
            )
        );
        for (const c of children) {
            traverse(c);
        }
    };

    traverse(rooteNormalModule);
}

module.exports = {
    traverseModuleGraph
}