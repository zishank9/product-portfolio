
/* =========================================================
   RPG SKILL TREE — INTERACTIVE ABILITIES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const tree = document.getElementById("skillsTree");

    if (!tree) return;

    const abilities = {
        requirements: {
            title: "Requirements Gathering",
            description:
                "Understanding client needs and translating them into clear, actionable requirements.",
            tags: ["Business Analysis", "Requirements", "Client Discussions"],
            example:
                "For third-party integrations, I work with clients and technical teams to clarify expected workflows, dependencies, and delivery requirements."
        },

        stories: {
            title: "User Stories & Acceptance Criteria",
            description:
                "Breaking business requirements into user stories that engineering teams can discuss, estimate, and implement.",
            tags: ["User Stories", "Acceptance Criteria", "Jira"],
            example:
                "I translate integration and feature requirements into actionable user stories, including expected behavior and validation criteria."
        },

        process: {
            title: "Process Mapping",
            description:
                "Understanding how existing workflows operate and documenting changes needed for improved business processes.",
            tags: ["Workflow Analysis", "Documentation", "Business Processes"],
            example:
                "During migration and integration projects, I help clarify existing workflows and how the target process should function."
        },

        stakeholders: {
            title: "Stakeholder Management",
            description:
                "Keeping clients, business teams, and engineering stakeholders aligned on requirements, progress, and delivery expectations.",
            tags: ["Communication", "Coordination", "Stakeholder Alignment"],
            example:
                "I coordinate discussions between clients, developers, DevOps, and third-party providers to resolve dependencies and keep delivery moving."
        },

        prioritization: {
            title: "Prioritization",
            description:
                "Helping teams understand business needs, dependencies, and delivery considerations when planning work.",
            tags: ["Backlog Discussions", "Dependencies", "Planning"],
            example:
                "I help clarify which requirements and integration dependencies need attention before development or release activities can proceed."
        },

        documentation: {
            title: "Product & Process Documentation",
            description:
                "Creating clear documentation to support implementation, testing, troubleshooting, and operational handover.",
            tags: ["Confluence", "User Stories", "Process Documentation"],
            example:
                "I prepare requirements, workflow information, and deployment-related documentation so different teams have a shared reference."
        },

        agile: {
            title: "Agile / Scrum",
            description:
                "Supporting iterative delivery through requirements refinement, coordination, and progress tracking.",
            tags: ["Agile", "Scrum", "Jira", "Confluence"],
            example:
                "I work with engineering teams to clarify requirements, track delivery items, and address issues throughout development."
        },

        coordination: {
            title: "Cross-Functional Coordination",
            description:
                "Connecting business, development, QA, DevOps, and external teams to support delivery.",
            tags: ["Engineering Coordination", "Communication", "Dependencies"],
            example:
                "During AWS environment migration, I coordinated DevOps, database, and development teams around migration activities and troubleshooting."
        },

        release: {
            title: "Release Planning",
            description:
                "Supporting release readiness through dependency tracking, testing coordination, and deployment preparation.",
            tags: ["Release Readiness", "Deployment", "Planning"],
            example:
                "I help coordinate testing, migration validation, documentation, and operational preparation before planned releases."
        },

        testing: {
            title: "Testing & UAT",
            description:
                "Validating software behavior against requirements and identifying issues before delivery.",
            tags: ["UAT", "Postman", "Charles Proxy", "Validation"],
            example:
                "I set up test environments and validate hospitality integrations, investigating unexpected behavior before client delivery."
        },

        issues: {
            title: "Issue Investigation & Resolution",
            description:
                "Investigating reported problems, collecting relevant information, and coordinating technical resolution.",
            tags: ["Troubleshooting", "Jira", "ServiceNow", "Zendesk"],
            example:
                "I work with engineering and support teams to investigate integration failures, review available evidence, and coordinate fixes."
        },

        golive: {
            title: "Go-Live & Post-Delivery Support",
            description:
                "Supporting implementation, client delivery, and issue resolution after release.",
            tags: ["Go-Live", "Client Coordination", "Post-Release Support"],
            example:
                "For hospitality integrations, I coordinate delivery activities and help troubleshoot issues encountered after go-live."
        },

        sql: {
            title: "SQL & Data Validation",
            description:
                "Using database knowledge to support investigation, data verification, and migration validation.",
            tags: ["MySQL", "SQL Server", "DynamoDB", "Data Validation"],
            example:
                "During ETL and data migration projects, I support data validation, investigate discrepancies, and coordinate reconciliation activities."
        },

        apis: {
            title: "API & Third-Party Integrations",
            description:
                "Understanding integration workflows, testing expected behavior, and coordinating implementation with technical teams.",
            tags: ["APIs", "Postman", "Third-Party Systems", "Integration Testing"],
            example:
                "I have supported hospitality integrations involving telephony, Wi-Fi, voicemail, and external platforms such as Canary, Virdee, and Toast."
        },

        aws: {
            title: "AWS & Cloud Platforms",
            description:
                "Supporting cloud migration and platform delivery through requirements, coordination, validation, and troubleshooting.",
            tags: ["AWS", "Cloud Migration", "DevOps Coordination"],
            example:
                "I coordinated AWS environment migration activities involving DevOps, database, and development teams, including migration validation."
        },

        monitoring: {
            title: "Monitoring & Observability",
            description:
                "Using monitoring tools to investigate application behavior and support incident analysis.",
            tags: ["Splunk", "Datadog", "Application Monitoring", "Telemetry"],
            example:
                "I have worked with monitoring tools and Java application telemetry to support issue investigation and operational visibility."
        },

        identity: {
            title: "Identity Management",
            description:
                "Supporting identity integration and migration workflows through technical coordination, testing, and requirements clarification.",
            tags: ["Amazon Cognito", "AWS Lambda", "Identity Integration"],
            example:
                "I supported identity management integration work involving Amazon Cognito and AWS Lambda, including implementation and validation activities."
        },

        migration: {
            title: "ETL & Data Migration",
            description:
                "Supporting migration workflows, data validation, issue investigation, and coordination between business and engineering teams.",
            tags: ["ETL", "Data Migration", "SQL", "Reconciliation"],
            example:
                "I worked on hospitality data migration projects involving legacy data mapping, validation, and financial reconciliation."
        }
    };

    const buttons = tree.querySelectorAll(".skill-ability");
    const title = document.getElementById("skillAbilityTitle");
    const description = document.getElementById("skillAbilityDescription");
    const tags = document.getElementById("skillAbilityTags");
    const example = document.getElementById("skillAbilityExample");
    const category = tree.querySelector(".skill-detail-category");

    function selectAbility(button) {
        const ability = abilities[button.dataset.ability];

        if (!ability) return;

        buttons.forEach((item) => {
            const selected = item === button;

            item.classList.toggle("is-selected", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        title.textContent = ability.title;
        description.textContent = ability.description;
        example.textContent = ability.example;

        tags.replaceChildren();

        ability.tags.forEach((tag) => {
            const span = document.createElement("span");
            span.textContent = tag;
            tags.appendChild(span);
        });

        const branch = button.closest(".skill-branch");

        if (branch) {
            category.textContent =
                branch.querySelector("h4").textContent;
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            selectAbility(button);
        });
    });

    // Select the first ability on initial load.
    if (buttons.length > 0) {
        selectAbility(buttons[0]);
    }
});
