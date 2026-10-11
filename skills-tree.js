
/* =========================================================
   RPG SKILL TREE — INTERACTIVE ABILITIES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const tree = document.getElementById("skillsTree");

    if (!tree) return;

   
const abilities = {

    // BUSINESS & PRODUCT

    requirements: {
        title: "Requirements Gathering",
        description:
            "Understanding business problems, clarifying client expectations, and translating needs into actionable requirements.",
        tags: ["Business Analysis", "Client Requirements", "Stakeholder Discussions"],
        example:
            "For hospitality integrations, I worked with clients to understand how systems such as telephony, Wi-Fi, and third-party platforms should interact, then clarified those expectations with engineering teams."
    },

    stories: {
        title: "User Stories & Acceptance Criteria",
        description:
            "Breaking business requirements into manageable user stories with clear expected behavior and validation criteria.",
        tags: ["User Stories", "Acceptance Criteria", "Jira"],
        example:
            "I translated integration and feature requirements into user stories so developers could understand the expected functionality and QA teams could validate the results."
    },

    process: {
        title: "Process Mapping",
        description:
            "Understanding existing business workflows, identifying dependencies, and documenting how processes should work after changes.",
        tags: ["Workflow Analysis", "Process Documentation", "Business Analysis"],
        example:
            "During data migration projects, I helped clarify how information moved from legacy hospitality systems into the target platform and what needed to be validated."
    },

    stakeholders: {
        title: "Stakeholder Management",
        description:
            "Keeping clients, business stakeholders, developers, and external partners aligned on requirements, progress, and dependencies.",
        tags: ["Stakeholder Communication", "Client Coordination", "Team Alignment"],
        example:
            "During third-party integrations, I coordinated with clients, engineering teams, and external providers to clarify responsibilities, investigate blockers, and support delivery."
    },

    prioritization: {
        title: "Prioritization & Dependencies",
        description:
            "Helping teams understand business needs, delivery dependencies, and which issues require attention before work can progress.",
        tags: ["Requirements Prioritization", "Dependencies", "Delivery Planning"],
        example:
            "When an integration depended on external configurations or technical changes, I helped identify those dependencies and coordinate the next steps with the relevant teams."
    },

    documentation: {
        title: "Product & Process Documentation",
        description:
            "Preparing clear documentation that supports implementation, testing, troubleshooting, and knowledge sharing.",
        tags: ["Confluence", "User Stories", "Process Documentation"],
        example:
            "I documented requirements, integration workflows, troubleshooting steps, and migration procedures to help teams work from a shared understanding."
    },

    // DELIVERY & QUALITY

    agile: {
        title: "Agile / Scrum",
        description:
            "Supporting iterative software delivery through requirements clarification, development coordination, and progress tracking.",
        tags: ["Agile", "Scrum", "Jira", "CSPO"],
        example:
            "I worked with development teams to clarify user stories, answer implementation questions, track issues, and support validation during feature delivery."
    },

    coordination: {
        title: "Cross-Functional Coordination",
        description:
            "Connecting business, development, QA, DevOps, database, and external teams to manage dependencies and support delivery.",
        tags: ["Cross-Team Collaboration", "Engineering Coordination", "Dependencies"],
        example:
            "During AWS environment migration, I coordinated DevOps, database, and development teams around migration preparation, execution, validation, and troubleshooting."
    },

    release: {
        title: "Release Planning & Readiness",
        description:
            "Supporting release preparation through dependency tracking, testing coordination, documentation, and deployment readiness.",
        tags: ["Release Readiness", "Deployment Coordination", "Planning"],
        example:
            "For enterprise software releases, I coordinated testing and outstanding issues, followed up on dependencies, and helped teams prepare for deployment."
    },

    testing: {
        title: "Testing & UAT",
        description:
            "Validating expected software behavior, identifying defects, and coordinating investigations before client delivery.",
        tags: ["UAT", "Postman", "Charles Proxy", "Integration Testing"],
        example:
            "For hospitality IoT integrations, I set up test environments, tested integration behavior, investigated unexpected results, and coordinated follow-up testing."
    },

    issues: {
        title: "Issue Investigation & Resolution",
        description:
            "Investigating application problems, gathering evidence, and coordinating with technical teams to support resolution.",
        tags: ["Troubleshooting", "Jira", "ServiceNow", "Zendesk"],
        example:
            "When integrations behaved unexpectedly, I helped reproduce issues, review available information, document findings, and coordinate investigations with developers."
    },

    golive: {
        title: "Go-Live & Post-Delivery Support",
        description:
            "Helping teams prepare for client delivery and supporting issue investigation after implementation.",
        tags: ["Go-Live", "Client Coordination", "Post-Release Support"],
        example:
            "During hospitality integration delivery, I coordinated with internal and third-party teams, supported go-live activities, and helped troubleshoot issues after release."
    },

    // TECHNICAL & SYSTEMS

    sql: {
        title: "SQL & Data Validation",
        description:
            "Using database knowledge to validate information, investigate discrepancies, and support enterprise data migration.",
        tags: ["MySQL", "SQL Server", "DynamoDB", "Data Validation"],
        example:
            "During ETL migration, I used SQL-based validation to compare source and target information, identify discrepancies, and support reconciliation with the relevant teams."
    },

    apis: {
        title: "API & Third-Party Integrations",
        description:
            "Understanding integration workflows, validating expected behavior, and coordinating technical implementation.",
        tags: ["APIs", "Postman", "Third-Party Integrations", "Testing"],
        example:
            "I supported integrations involving PBX, voicemail, Wi-Fi, Canary, Virdee, and Toast by clarifying requirements, coordinating teams, and testing integration behavior."
    },

    aws: {
        title: "AWS & Cloud Platforms",
        description:
            "Supporting cloud-related initiatives through requirements clarification, technical coordination, validation, and troubleshooting.",
        tags: ["AWS", "Cloud Migration", "DevOps Coordination"],
        example:
            "During AWS environment migration, I coordinated development, database, and DevOps teams, supported migration planning, and participated in validation and troubleshooting."
    },

    monitoring: {
        title: "Monitoring & Observability",
        description:
            "Using application monitoring and telemetry information to investigate incidents and support operational visibility.",
        tags: ["Splunk", "Datadog", "CloudWatch", "Application Telemetry"],
        example:
            "I worked with Splunk, Datadog, and Java application telemetry to investigate application behavior, review alerts, and coordinate technical follow-up."
    },

    identity: {
        title: "Identity Management",
        description:
            "Supporting identity integration requirements, migration scenarios, testing, and coordination with technical teams.",
        tags: ["Amazon Cognito", "AWS Lambda", "Identity Integration"],
        example:
            "I supported identity management integration work involving Amazon Cognito and AWS Lambda, including requirements clarification, implementation coordination, and validation. The intended large-scale migration was not completed."
    },

    migration: {
        title: "ETL & Data Migration",
        description:
            "Supporting legacy data mapping, transformation requirements, validation, and reconciliation across enterprise systems.",
        tags: ["ETL", "SQL", "Data Migration", "Reconciliation"],
        example:
            "I worked on hospitality data migration projects involving legacy field mapping, SQL-based validation, financial reconciliation, and coordination with engineering teams."
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
