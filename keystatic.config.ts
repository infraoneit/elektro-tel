// @ts-nocheck
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: process.env.NODE_ENV === 'development'
        ? { kind: 'local' }
        : {
            kind: 'github',
            repo: 'infraoneit/elektro-tel',
        },
    singletons: {},
    collections: {
        help: collection({
            label: 'Anleitungen',
            slugField: 'title',
            path: 'content/help/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Titel' } }),
                body: fields.markdoc({
                    label: 'Anleitung',
                    description: 'Hier finden Sie Hinweise zur Bedienung.',
                    extension: 'md',
                }),
            },
        }),
        // @ts-ignore
        news: collection({
            label: 'News',
            slugField: 'title',
            path: 'content/news/*',
            format: { contentField: 'body' }, // Expect Frontmatter + Markdown Body
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                // Slug removed: Uses filename
                heroImage: fields.image({
                    label: 'Hero Image',
                    directory: 'public/images/news',
                    publicPath: '/images/news/',
                }),
                icon: fields.select({
                    label: 'Icon',
                    description: 'Select an icon to display if no image is provided',
                    options: [
                        { label: 'Newspaper (Default)', value: 'Newspaper' },
                        { label: 'Trophy (Awards)', value: 'Trophy' },
                        { label: 'Phone (Service)', value: 'Phone' },
                        { label: 'Handshake (Partnership)', value: 'Handshake' },
                        { label: 'Wrench (Technical)', value: 'Wrench' },
                        { label: 'Shield (Security)', value: 'ShieldCheck' },
                        { label: 'Info (General)', value: 'Info' },
                    ],
                    defaultValue: 'Newspaper',
                }),
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                intro: fields.text({ label: 'Intro Text' }),
                body: fields.markdoc({
                    label: 'Content (Markdown)',
                    extension: 'md',
                    options: {
                        image: {
                            directory: 'public/images/news/inline',
                            publicPath: '/images/news/inline/',
                        },
                    },
                }),
            },
        }),
        // @ts-ignore
        references: collection({
            label: 'Referenzen',
            slugField: 'title',
            path: 'content/references/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                // Slug removed
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                order: fields.number({ label: 'Manual Sort Order' }),
                category: fields.text({ label: 'Category' }),
                address: fields.text({ label: 'Address' }),
                client: fields.text({ label: 'Client' }),
                architect: fields.text({ label: 'Architect' }),
                works: fields.text({ label: 'Works Performed' }),
                image: fields.image({
                    label: 'Image (Upload)',
                    directory: 'public/images/references',
                    publicPath: '/images/references/',
                }),
                heroImage: fields.text({ label: 'Hero Image Path' }),
                body: fields.markdoc({ label: 'Content (Markdown)', extension: 'md' }),
            },
        }),
        // @ts-ignore
        jobs: collection({
            label: 'Jobs',
            slugField: 'title',
            path: 'content/jobs/*',
            format: { contentField: 'body' },

            schema: {
                title: fields.slug({ name: { label: 'Job Title' } }),
                slug: fields.text({ label: 'Slug (Optional)' }), // Kept optional as some files have it
                date: fields.date({ label: 'Date', validation: { isRequired: true }, defaultValue: { kind: 'today' } }),
                location: fields.text({ label: 'Location' }),
                intro: fields.text({ label: 'Intro' }),
                applyContact: fields.text({ label: 'Apply Email' }),
                body: fields.markdoc({ label: 'Content (Markdown)', extension: 'md' }),
            },
        }),
        // @ts-ignore
        partners: collection({
            label: 'Partners',
            slugField: 'title',
            path: 'content/partners/*',
            format: { contentField: 'body' },
            schema: {
                title: fields.slug({ name: { label: 'Partner Name' } }),
                // Slug removed
                url: fields.text({ label: 'Website URL' }),
                logo: fields.image({
                    label: 'Logo',
                    directory: 'public/partners',
                    publicPath: '/partners/',
                }),
                order: fields.number({ label: 'Order' }),
                body: fields.markdoc({ label: 'Description (Markdown)', extension: 'md' }), // Ensure extension: 'md' here too just in case
            },
        }),
        // @ts-ignore
        teamMembers: collection({
            label: 'Team Members',
            slugField: 'title',
            path: 'content/team/*',
            format: { contentField: 'body' }, // Added format to handle .md files correctly
            schema: {
                title: fields.slug({ name: { label: 'Name' } }),
                // Slug removed
                order: fields.number({ label: 'Order' }),
                role: fields.text({ label: 'Role' }),
                jobTitle: fields.text({ label: 'Job Title' }),
                email: fields.text({ label: 'Email' }),
                image: fields.image({
                    label: 'Photo',
                    directory: 'public/images/team',
                    publicPath: '/images/team/',
                }),
                body: fields.markdoc({ label: 'Bio (Markdown)', extension: 'md' }),
            },
        }),
    },
});
