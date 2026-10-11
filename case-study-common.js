(() => {
    "use strict";

    const progressBar = document.querySelector(
        ".aws-progress-bar, .etl-progress-bar, .reading-progress-bar, " +
        ".idm-progress-bar, .iot-progress-bar, .mon-progress-bar"
    );
    const backToTop = document.querySelector(
        ".aws-back-top, .etl-back-top, .fd-back-top, .idm-back-top, " +
        ".iot-top-button, .mon-top-button"
    );
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (progressBar && backToTop) {
        const backToTopThreshold = backToTop.matches(
            ".iot-top-button, .mon-top-button"
        ) ? 450 : 500;

        function updateScrollUI() {
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollableHeight > 0
                ? (window.scrollY / scrollableHeight) * 100
                : 0;

            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            backToTop.classList.toggle(
                "visible",
                window.scrollY > backToTopThreshold
            );
        }

        window.addEventListener("scroll", updateScrollUI, { passive: true });
        window.addEventListener("resize", updateScrollUI);
        updateScrollUI();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    }

    document.querySelectorAll(
        ".aws-mobile-toc, .etl-mobile-toc, .fd-mobile-toc, " +
        ".idm-toc-mobile, .iot-mobile-toc, .mon-mobile-toc"
    ).forEach((mobileToc) => {
        mobileToc.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileToc.open = false;
            });
        });
    });

    const tocConfigs = [
        {
            sections: ".aws-content .case-section[id]",
            links: ".aws-toc a, .aws-mobile-links a",
            rootMargin: "-15% 0px -65% 0px",
            threshold: [0, 0.1, 0.3, 0.6],
            selection: "ratio"
        },
        {
            sections: ".etl-main .case-section[id]",
            links: ".etl-toc a, .etl-mobile-links a",
            rootMargin: "-15% 0px -65% 0px",
            threshold: [0, 0.1, 0.3, 0.6],
            selection: "ratio"
        },
        {
            sections: ".fd-article .fd-section[id]",
            links: ".fd-toc a, .fd-mobile-toc a",
            rootMargin: "-12% 0px -68% 0px",
            threshold: 0,
            selection: "top"
        },
        {
            sections: ".idm-content .case-section[id]",
            links: ".idm-toc a, .idm-toc-mobile a",
            rootMargin: "-15% 0px -65% 0px",
            threshold: [0, 0.1, 0.3, 0.6],
            selection: "ratio"
        },
        {
            sections: ".iot-content .iot-section[id]",
            links: ".iot-toc a",
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0,
            selection: "entries"
        },
        {
            sections: ".mon-content .mon-section[id]",
            links: ".mon-toc a",
            rootMargin: "-20% 0px -65% 0px",
            threshold: 0,
            selection: "entries"
        }
    ];

    const tocConfig = tocConfigs.find((config) =>
        document.querySelector(config.sections)
    );

    if (tocConfig && "IntersectionObserver" in window) {
        const sections = document.querySelectorAll(tocConfig.sections);
        const tocLinks = document.querySelectorAll(tocConfig.links);

        function setActiveSection(id) {
            tocLinks.forEach((link) => {
                const active = link.getAttribute("href") === `#${id}`;
                link.classList.toggle("active", active);

                if (active) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter((entry) =>
                entry.isIntersecting
            );

            if (tocConfig.selection === "entries") {
                visibleEntries.forEach((entry) => {
                    setActiveSection(entry.target.id);
                });
                return;
            }

            visibleEntries.sort((first, second) => {
                if (tocConfig.selection === "top") {
                    return first.boundingClientRect.top -
                        second.boundingClientRect.top;
                }

                return second.intersectionRatio - first.intersectionRatio;
            });

            if (visibleEntries.length) {
                setActiveSection(visibleEntries[0].target.id);
            }
        }, {
            rootMargin: tocConfig.rootMargin,
            threshold: tocConfig.threshold
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    const revealItems = document.querySelectorAll(
        ".aws-reveal, .etl-reveal, .fd-reveal, .idm-reveal, " +
        ".iot-reveal, .mon-reveal"
    );

   function reveal(item) {
    if (
        item.classList.contains("iot-reveal") ||
        item.classList.contains("mon-reveal")
    ) {
        item.classList.add("revealed");
    } else {
        item.classList.add("is-visible");
    }
}

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach(reveal);
    }
})();


if (document.querySelector('.aws-layout')) {
(() => {
            "use strict";

            /* Interactive workflow stages */
            const stages = [
                {
                    title: "01. Define requirements",
                    description:
                        "Clarify migration requirements, dependencies, expected " +
                        "outcomes, and the sequence of activities needed to " +
                        "prepare the work."
                },
                {
                    title: "02. Align technical teams",
                    description:
                        "Coordinate DevOps, database, and development work so " +
                        "dependencies and responsibilities are understood across " +
                        "the participating teams."
                },
                {
                    title: "03. Coordinate automation",
                    description:
                        "Follow up on Rundeck scripts and coordinate with " +
                        "developers involved in the Java-based artifact transfer " +
                        "program. This describes coordination, not authorship of " +
                        "the Java program."
                },
                {
                    title: "04. Prepare execution",
                    description:
                        "Help document migration procedures and coordinate the " +
                        "sequence of activities, keeping minimal downtime as an " +
                        "important planning objective."
                },
                {
                    title: "05. Validate results",
                    description:
                        "Review migration results against expectations, work " +
                        "with relevant teams to investigate issues, and support " +
                        "the validation and troubleshooting process."
                }
            ];

            const stageButtons = document.querySelectorAll(".aws-stage");
            const stageTitle = document.getElementById("awsStageTitle");
            const stageDescription =
                document.getElementById("awsStageDescription");

            stageButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = Number(button.dataset.stage);
                    const stage = stages[index];

                    if (!stage) return;

                    stageButtons.forEach((item) => {
                        item.setAttribute(
                            "aria-pressed",
                            String(item === button)
                        );
                    });

                    stageTitle.textContent = stage.title;
                    stageDescription.textContent = stage.description;
                });
            });

        })();
}


if (document.querySelector('.etl-layout')) {
(() => {
            "use strict";

            /* Interactive ETL workflow */
            const etlStages = [
                {
                    title: "01. Source data & requirements",
                    description:
                        "Understand the client's migration needs, review " +
                        "representative source data, and clarify the information " +
                        "that must be available in the target system."
                },
                {
                    title: "02. Field mapping",
                    description:
                        "Analyse sample source files and document how source " +
                        "fields correspond to the target data structure. These " +
                        "mappings communicate the expected transformation to " +
                        "the engineering team."
                },
                {
                    title: "03. ETL transformation",
                    description:
                        "The engineering team implements the ETL solution to " +
                        "process the source files and transform data according " +
                        "to the agreed requirements and mappings."
                },
                {
                    title: "04. Target data loading",
                    description:
                        "The transformed data is loaded into the target platform. " +
                        "The delivery focus is to ensure that the required records " +
                        "are available for subsequent validation."
                },
                {
                    title: "05. Validation & reconciliation",
                    description:
                        "Compare source and target data using sample data and SQL " +
                        "queries. Check expected results, financial consistency, " +
                        "and reporting accuracy, then identify discrepancies."
                },
                {
                    title: "06. Investigate & revalidate",
                    description:
                        "Investigate identified differences with the relevant " +
                        "teams, address issues, and repeat validation as needed. " +
                        "Automated checks and discrepancy reports support " +
                        "ongoing investigation."
                }
            ];

            const stageButtons =
                document.querySelectorAll(".etl-stage-button");

            const stageTitle = document.getElementById("etlStageTitle");
            const stageDescription =
                document.getElementById("etlStageDescription");

            stageButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = Number(button.dataset.etlStage);
                    const stage = etlStages[index];

                    if (!stage) return;

                    stageButtons.forEach((item) => {
                        item.setAttribute(
                            "aria-pressed",
                            String(item === button)
                        );
                    });

                    stageTitle.textContent = stage.title;
                    stageDescription.textContent = stage.description;
                });
            });

            /* Diagram lightbox */
            const lightbox = document.getElementById("etlLightbox");
            const openDiagram = document.getElementById("etlOpenDiagram");
            const closeDiagram = document.getElementById("etlCloseDiagram");
            const diagram = document.getElementById("etlDiagram");

            let previousFocus = null;

            function showLightbox() {
                previousFocus = document.activeElement;
                lightbox.classList.add("open");
                lightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                closeDiagram.focus();
            }

            function hideLightbox() {
                lightbox.classList.remove("open");
                lightbox.setAttribute("aria-hidden", "true");
                document.body.style.overflow = "";

                if (previousFocus) {
                    previousFocus.focus();
                }
            }

            openDiagram.addEventListener("click", showLightbox);
            closeDiagram.addEventListener("click", hideLightbox);

            lightbox.addEventListener("click", (event) => {
                if (event.target === lightbox) {
                    hideLightbox();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" &&
                    lightbox.classList.contains("open")) {
                    hideLightbox();
                }
            });

            /* Provide a helpful fallback if the diagram path is incorrect */
            diagram.addEventListener("error", () => {
                openDiagram.setAttribute("aria-disabled", "true");
                openDiagram.style.cursor = "default";

                const hint = openDiagram.querySelector(".etl-zoom-hint");
                if (hint) {
                    hint.textContent =
                        "Diagram unavailable — check images/etl-migration-flow.png";
                }
            });

        })();
}


if (document.querySelector('.fd-layout')) {
(function () {
            "use strict";

            /* Interactive workflow stages */

            const workflowButtons = Array.from(
                document.querySelectorAll(".fd-stage")
            );

            const workflowTitle =
                document.getElementById("workflowStageTitle");

            const workflowDetail =
                document.getElementById("workflowStageDetail");

            workflowButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    workflowButtons.forEach(function (item) {
                        item.setAttribute("aria-pressed", "false");
                    });

                    button.setAttribute("aria-pressed", "true");
                    workflowTitle.textContent = button.dataset.title;
                    workflowDetail.textContent = button.dataset.detail;
                });
            });

        })();
}


if (document.querySelector('.idm-layout')) {
(() => {
            "use strict";

            /* Interactive delivery workflow */
            const stages = [
                {
                    title: "01. Understand requirements",
                    description:
                        "Clarify client needs, identity integration expectations, " +
                        "and required business behaviour before work proceeds."
                },
                {
                    title: "02. Define user stories",
                    description:
                        "Translate the agreed requirements into user stories and " +
                        "actionable development tasks that explain the expected behaviour."
                },
                {
                    title: "03. Coordinate integration",
                    description:
                        "Work with developers and relevant teams on integration setup, " +
                        "questions, dependencies, and delivery coordination."
                },
                {
                    title: "04. Test and investigate",
                    description:
                        "Support integration testing and help investigate issues " +
                        "identified during implementation and testing."
                },
                {
                    title: "05. Prepare for delivery",
                    description:
                        "Support readiness for client use while communicating " +
                        "implementation status and outstanding rollout work accurately."
                }
            ];

            const stageButtons = document.querySelectorAll(".idm-stage");
            const stageTitle = document.getElementById("idmStageTitle");
            const stageDescription =
                document.getElementById("idmStageDescription");

            stageButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = Number(button.dataset.stage);
                    const stage = stages[index];

                    if (!stage) return;

                    stageButtons.forEach((item) => {
                        item.setAttribute(
                            "aria-pressed",
                            String(item === button)
                        );
                    });

                    stageTitle.textContent = stage.title;
                    stageDescription.textContent = stage.description;
                });
            });

            /* Diagram zoom lightbox */
            const lightbox = document.getElementById("idmLightbox");
            const lightboxImage = document.getElementById("idmLightboxImage");
            const lightboxCaption =
                document.getElementById("idmLightboxCaption");
            const lightboxClose =
                document.getElementById("idmLightboxClose");

            let previouslyFocusedElement = null;

            function openLightbox(button) {
                const imageSrc = button.dataset.zoomSrc;
                const imageAlt = button.dataset.zoomAlt || "";

                if (!imageSrc) return;

                previouslyFocusedElement = button;
                lightboxImage.src = imageSrc;
                lightboxImage.alt = imageAlt;
                lightboxCaption.textContent = imageAlt;

                lightbox.classList.add("open");
                lightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                lightboxClose.focus();
            }

            function closeLightbox() {
                lightbox.classList.remove("open");
                lightbox.setAttribute("aria-hidden", "true");
                lightboxImage.src = "";
                document.body.style.overflow = "";

                if (previouslyFocusedElement) {
                    previouslyFocusedElement.focus();
                }
            }

            document.querySelectorAll("[data-zoom-src]").forEach((button) => {
                button.addEventListener("click", () => {
                    openLightbox(button);
                });
            });

            lightboxClose.addEventListener("click", closeLightbox);

            lightbox.addEventListener("click", (event) => {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("open")
                ) {
                    closeLightbox();
                }
            });
        })();
}


if (document.querySelector('.iot-layout')) {
// Interactive workflow stages
        const workflowStages = [
            {
                title: "01 · Requirements gathering",
                text: "I worked with clients to understand the intended business workflow and the expected behaviour of the integration before translating those needs into requirements."
            },
            {
                title: "02 · User stories and expectations",
                text: "I translated requirements into user stories and actionable tasks, clarifying expected behaviour and answering questions raised during implementation."
            },
            {
                title: "03 · Internal and external coordination",
                text: "I coordinated with developers and third-party teams, followed up on dependencies, and helped keep the business requirement aligned with the technical implementation."
            },
            {
                title: "04 · Test environment and validation",
                text: "I set up the IoT test environment, tested integration behaviour before delivery, investigated unexpected results, and coordinated follow-up testing when changes were needed."
            },
            {
                title: "05 · Client delivery and support",
                text: "I coordinated delivery to the client and supported go-live activities and post-delivery troubleshooting with developers and external teams when issues arose."
            }
        ];

        const stageButtons = document.querySelectorAll(".iot-stage");
        const stageTitle = document.getElementById("stageDetailTitle");
        const stageText = document.getElementById("stageDetailText");

        stageButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.stage);
                const stage = workflowStages[index];

                if (!stage) return;

                stageButtons.forEach((item) => {
                    const selected = item === button;
                    item.classList.toggle("active", selected);
                    item.setAttribute("aria-pressed", String(selected));
                });

                stageTitle.textContent = stage.title;
                stageText.textContent = stage.text;
            });
        });
}


if (document.querySelector('.mon-layout')) {
// Interactive monitoring workflow
        const monitoringSteps = [
            {
                title: "01 · Monitor application health",
                text: "Use Splunk, Datadog, and AWS CloudWatch to review application signals, alerts, and recurring failures."
            },
            {
                title: "02 · Review and prioritize alerts",
                text: "Review repetitive alerts, refine filtering and thresholds, and distinguish higher-priority issues from lower-priority warnings."
            },
            {
                title: "03 · Investigate the issue",
                text: "Review available evidence, identify recurring patterns, and follow documented troubleshooting steps for known failures."
            },
            {
                title: "04 · Coordinate with developers and QA",
                text: "Share findings, coordinate further technical investigation, and follow up on issues requiring development or testing support."
            },
            {
                title: "05 · Document and track",
                text: "Maintain SOPs and troubleshooting guides, record recurring problems, and support consistent escalation and follow-up."
            },
            {
                title: "06 · Review and improve",
                text: "Use recurring issues and operational observations to identify opportunities to improve monitoring visibility and investigation practices."
            }
        ];

        const workflowButtons = document.querySelectorAll(".mon-workflow-step");
        const workflowTitle = document.getElementById("workflowTitle");
        const workflowDescription = document.getElementById("workflowDescription");

        workflowButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const index = Number(button.dataset.step);
                const step = monitoringSteps[index];

                if (!step) return;

                workflowButtons.forEach((item) => {
                    const selected = item === button;
                    item.classList.toggle("active", selected);
                    item.setAttribute("aria-pressed", String(selected));
                });

                workflowTitle.textContent = step.title;
                workflowDescription.textContent = step.text;
            });
        });
}


if (document.querySelector('#currentYear')) {
const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");
        const menuIcon = document.getElementById("menuIcon");

        function closeMenu() {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuIcon.textContent = "☰";
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuIcon.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });

        document.getElementById("currentYear").textContent =
            new Date().getFullYear();
}

/* =========================================
   INTERACTIVE CAREER TIMELINE
========================================= */

(function () {
    const section = document.querySelector(".career-section");

    if (!section) return;

    const careerData = {
        delivery: {
            title: "Product Delivery Manager",
            date: "HotelKey · Late 2022–2025",
            summary:
                "Connecting business priorities with engineering and delivery teams.",
            points: [
                "Turned client and business requirements into user stories and actionable work.",
                "Coordinated developers, QA, DevOps and external teams across integrations, identity management, data migration and monitoring.",
                "Supported testing, issue investigation, release readiness and go-live."
            ]
        },

        analyst: {
            title: "Business Analyst",
            date: "HotelKey · 2020–2022",
            summary:
                "Turning business needs into clear requirements and implementation details.",
            points: [
                "Gathered requirements and documented processes, user stories and implementation needs.",
                "Supported data migration through field mapping, SQL-based validation, reporting and testing.",
                "Prepared client-facing documentation and worked with teams to clarify gaps and resolve issues."
            ]
        },

        support: {
            title: "Technical Support Agent",
            date: "HotelKey · 2019–2020",
            summary:
                "Learning how software problems affect customers and how teams can resolve them.",
            points: [
                "Investigated application and system issues reported by customers.",
                "Contributed to knowledge-base articles, standard procedures, reporting and team knowledge sharing."
            ]
        }
    };

    const bars = section.querySelectorAll(".career-bar");
    const title = section.querySelector("#careerDetailTitle");
    const date = section.querySelector("#careerDetailDate");
    const summary = section.querySelector("#careerDetailSummary");
    const list = section.querySelector("#careerDetailList");

    if (!title || !date || !summary || !list) return;

    bars.forEach((bar) => {
        bar.addEventListener("click", () => {
            const role = careerData[bar.dataset.career];

            if (!role) return;

            bars.forEach((item) => {
                item.classList.remove("is-active");
                item.setAttribute("aria-pressed", "false");
            });

            bar.classList.add("is-active");
            bar.setAttribute("aria-pressed", "true");

            title.textContent = role.title;
            date.textContent = role.date;
            summary.textContent = role.summary;

            list.replaceChildren();

            role.points.forEach((point) => {
                const li = document.createElement("li");
                li.textContent = point;
                list.appendChild(li);
            });
        });
    });
})();


/* =========================================
   INTERACTIVE SKILLS MIND MAP
========================================= */

(function () {
    function initializeSkillsMindMap() {
        const section = document.querySelector(
            ".skills-mindmap-section"
        );

        if (!section) return;

        const skillData = {
            business: {
                title: "Business Analysis",
                description:
                    "Turning business needs into clear requirements that teams can discuss, estimate and deliver.",
                skills: [
                    "Requirements Gathering",
                    "User Stories",
                    "Acceptance Criteria",
                    "Stakeholder Management",
                    "Process Documentation",
                    "Agile / Scrum"
                ],
                example:
                    "For a new integration, I help clarify client requirements, identify dependencies and turn expected behavior into actionable user stories."
            },

            delivery: {
                title: "Product Delivery",
                description:
                    "Helping teams stay aligned, manage dependencies and work through issues during delivery.",
                skills: [
                    "Jira",
                    "Confluence",
                    "Cross-team Coordination",
                    "Release Readiness",
                    "Incident Management",
                    "ServiceNow"
                ],
                example:
                    "During enterprise delivery, I coordinate with engineering, QA, DevOps and external teams to clarify blockers, support testing and prepare for go-live."
            },

            testing: {
                title: "Testing & Validation",
                description:
                    "Supporting validation, investigating unexpected behavior and helping teams understand defects.",
                skills: [
                    "Postman",
                    "Charles Proxy",
                    "Integration Testing",
                    "UAT Support",
                    "SQL Validation",
                    "Defect Investigation"
                ],
                example:
                    "During data migration, I support SQL-based validation and help investigate mismatches before delivery."
            },

            technical: {
                title: "Technical Systems",
                description:
                    "Using monitoring, data and platform knowledge to collaborate with technical teams on enterprise software and integrations.",
                skills: [
                    "AWS",
                    "Amazon Cognito",
                    "AWS Lambda",
                    "CloudWatch",
                    "Splunk",
                    "Datadog",
                    "Rundeck",
                    "MySQL",
                    "SQL Server",
                    "DynamoDB",
                    "Power BI",
                    "Zendesk",
                    "Microsoft Office",
                    "Teams",
                    "Figma"
                ],
                example:
                    "For cloud migration, monitoring and identity management initiatives, I support requirements, coordination, investigation and validation with technical teams."
            },

            communication: {
                title: "Communication & Collaboration",
                description:
                    "Helping stakeholders and delivery teams stay aligned on requirements, priorities and next steps.",
                skills: [
                    "Stakeholder Communication",
                    "Cross-team Collaboration",
                    "Client Documentation",
                    "Requirements Clarification",
                    "Knowledge Sharing"
                ],
                example:
                    "When business and engineering teams have different expectations, I help clarify the requirement, document decisions and keep the work moving."
            },

            solving: {
                title: "Problem Solving",
                description:
                    "Investigating issues, understanding their impact and working with the right teams toward resolution.",
                skills: [
                    "Issue Investigation",
                    "Incident Management",
                    "Defect Analysis",
                    "Troubleshooting Coordination",
                    "Process Improvement"
                ],
                example:
                    "When an integration behaves unexpectedly, I help reproduce the issue, collect relevant information and coordinate investigation with technical teams."
            }
        };

        const nodes = section.querySelectorAll(
            ".skills-map-node"
        );

        const title = section.querySelector(
            "#skillsDetailTitle"
        );

        const description = section.querySelector(
            "#skillsDetailDescription"
        );

        const tags = section.querySelector(
            "#skillsDetailTags"
        );

        const example = section.querySelector(
            "#skillsDetailExample"
        );

        if (!title || !description || !tags || !example) {
            return;
        }

        nodes.forEach((node) => {
            node.addEventListener("click", () => {
                const selected = skillData[node.dataset.skill];

                if (!selected) return;

                nodes.forEach((item) => {
                    item.classList.remove("is-active");
                    item.setAttribute(
                        "aria-pressed",
                        "false"
                    );
                });

                node.classList.add("is-active");
                node.setAttribute("aria-pressed", "true");

                title.textContent = selected.title;
                description.textContent =
                    selected.description;
                example.textContent = selected.example;

                tags.replaceChildren();

                selected.skills.forEach((skill) => {
                    const tag = document.createElement("span");
                    tag.textContent = skill;
                    tags.appendChild(tag);
                });
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeSkillsMindMap
        );
    } else {
        initializeSkillsMindMap();
    }
})();
