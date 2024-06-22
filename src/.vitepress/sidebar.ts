export default [
    {
        text: 'Introduction',
        link: '/'
    },
    {
        text: "New team member",
        link: "Onboarding.md"
    },
    {
        text: "Development Guide",
        items: [
            {
                text: "Design",
                items: [
                    {
                        text: "1. Naming Conventions",
                        link: "Design/1_naming.md"
                    },
                    {
                        text: "2. Design Principles",
                        link: "Design/2_design.md"
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


