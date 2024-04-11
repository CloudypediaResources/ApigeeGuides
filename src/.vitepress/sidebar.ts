export default [
    {
        text: 'Introduction',
        link: '/'
    },
    {
        text: "Learning Guide",
        link: "LearningGuide.md"
    },
    {
        text: "Development Guide",
        items: [
            {
                text: "GeneralRules",
                items: [
                    {
                        text: "1. Design",
                        link: "Development/GeneralRules/1-Design.md"
                    },
                    {
                        text: "2. Development",
                        link: "Development/GeneralRules/2-Development.md"
                    },
                    {
                        text: "3. Testing",
                        link: "Development/GeneralRules/3-Testing.md"
                    },
                    {
                        text: "4. Documentation",
                        link: "Development/GeneralRules/4-Documentation.md"
                    }
                ]
            },
            {
                text: "GeneralTopics",
                items: [
                    {
                        text: "Deployment",
                        link: "Development/GeneralTopics/Deployment.md"
                    },
                    {
                        text: "WSDL Guide",
                        link: "Development/GeneralTopics/WSDL_Guide.md"
                    }
                ]
            },
            {
                text: "Policy Notes",
                items: [
                    {
                        text: "Extract Variable",
                        link: "Development/PolicyNotes/EV-ExtractVariables policy.md"
                    }
                ]
            },
        ]
    },
    {
        text: "Project Specific",
        items: [
            {
                text: "REGA",
                items: [
                    {
                        text: "Design",
                        link: "ProjectSpecific/REGA/REGA_Design.md"
                    }
                ]
            }
        ]
    },
];


