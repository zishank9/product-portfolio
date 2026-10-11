
/* =========================================================
   RPG SKILL TREE — SVG CONNECTIONS V2
   Edge-to-edge lines and selected skill highlighting
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const board = document.querySelector(".skills-tree-board");
    const svg = board?.querySelector(".skill-tree-connections");

    if (!board || !svg) return;

    /* -----------------------------------------
       01. SKILL CONNECTIONS
    ----------------------------------------- */

    const connections = [

        // Business & Product
        ["requirements", "stories"],
        ["stories", "process"],
        ["requirements", "stakeholders"],
        ["stories", "prioritization"],
        ["process", "documentation"],
        ["stakeholders", "prioritization"],
        ["prioritization", "documentation"],

        // Delivery & Quality
        ["agile", "coordination"],
        ["coordination", "release"],
        ["agile", "testing"],
        ["coordination", "issues"],
        ["release", "golive"],
        ["testing", "issues"],
        ["issues", "golive"],

        // Technical & Systems
        ["sql", "apis"],
        ["apis", "aws"],
        ["sql", "monitoring"],
        ["apis", "identity"],
        ["aws", "migration"],
        ["monitoring", "identity"],
        ["identity", "migration"],

        // Cross-branch connections
        ["documentation", "agile"],
        ["golive", "migration"]

    ];

    const namespace = "http://www.w3.org/2000/svg";

    /* -----------------------------------------
       02. GET CIRCLE POSITION
    ----------------------------------------- */

    function getCirclePosition(abilityId, boardRect) {

        const icon = Array.from(
            board.querySelectorAll(".skill-ability")
        ).find(button =>
            button.dataset.ability === abilityId
        )?.querySelector(".ability-icon");

        if (!icon) return null;

        const rect = icon.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2 - boardRect.left,
            y: rect.top + rect.height / 2 - boardRect.top,
            radius: rect.width / 2
        };
    }

    /* -----------------------------------------
       03. DRAW CONNECTIONS
    ----------------------------------------- */

    function drawConnections() {

        const boardRect = board.getBoundingClientRect();

        if (!boardRect.width || !boardRect.height) return;

        svg.setAttribute(
            "viewBox",
            `0 0 ${boardRect.width} ${boardRect.height}`
        );

        svg.setAttribute(
            "preserveAspectRatio",
            "none"
        );

        svg.replaceChildren();

        const selected = board.querySelector(
            ".skill-ability.is-selected"
        )?.dataset.ability;

        connections.forEach(([fromId, toId]) => {

            const from = getCirclePosition(fromId, boardRect);
            const to = getCirclePosition(toId, boardRect);

            if (!from || !to) return;

            /* Calculate direction */

            const dx = to.x - from.x;
            const dy = to.y - from.y;

            const distance = Math.hypot(dx, dy);

            if (distance === 0) return;

            const ux = dx / distance;
            const uy = dy / distance;

            /* Start and end at circle edges */

            const x1 = from.x + ux * from.radius;
            const y1 = from.y + uy * from.radius;

            const x2 = to.x - ux * to.radius;
            const y2 = to.y - uy * to.radius;

            /* Create SVG line */

            const line = document.createElementNS(
                namespace,
                "line"
            );

            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);

            line.setAttribute(
                "data-from",
                fromId
            );

            line.setAttribute(
                "data-to",
                toId
            );

            /* Highlight selected skill connections */

                const progressionPaths = {
            requirements: ["requirements"],
            stories: ["requirements", "stories"],
            process: ["requirements", "stories", "process"],
            stakeholders: ["requirements", "stakeholders"],
            prioritization: ["requirements", "stories", "prioritization"],
            documentation: ["requirements", "stories", "process", "documentation"],

            agile: ["agile"],
            coordination: ["agile", "coordination"],
            release: ["agile", "coordination", "release"],
            testing: ["agile", "testing"],
            issues: ["agile", "coordination", "issues"],
            golive: ["agile", "coordination", "release", "golive"],

            sql: ["sql"],
            apis: ["sql", "apis"],
            aws: ["sql", "apis", "aws"],
            monitoring: ["sql", "monitoring"],
            identity: ["sql", "apis", "identity"],
            migration: ["sql", "apis", "aws", "migration"]
        };

        const activePath = progressionPaths[selected] || [];

        const connectionIndex = activePath.findIndex(
            (abilityId, index) =>
                index < activePath.length - 1 &&
                (
                    (abilityId === fromId && activePath[index + 1] === toId) ||
                    (abilityId === toId && activePath[index + 1] === fromId)
                )
        );

        if (connectionIndex !== -1) {
            line.classList.add("is-highlighted");
        }
            svg.appendChild(line);

        });
    }

    /* -----------------------------------------
       04. HANDLE SKILL SELECTION
    ----------------------------------------- */

    board.addEventListener("click", (event) => {

        const button = event.target.closest(
            ".skill-ability"
        );

        if (!button || !board.contains(button)) return;

        requestAnimationFrame(drawConnections);

    });

    /* -----------------------------------------
       05. HANDLE SCREEN RESIZING
    ----------------------------------------- */

    window.addEventListener(
        "resize",
        () => requestAnimationFrame(drawConnections)
    );

    if ("ResizeObserver" in window) {

        const observer = new ResizeObserver(() => {
            requestAnimationFrame(drawConnections);
        });

        observer.observe(board);
    }

    /* -----------------------------------------
       06. INITIALIZE
    ----------------------------------------- */

    drawConnections();

});
