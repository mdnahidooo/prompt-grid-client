'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Table, Button } from '@heroui/react';

// import PromptDetailsButton from './PromptDetailsButton';
import UpdatePromptModal from './UpdatePromptModal';
import DeletePromptModal from './DeletePromptModal';

export default function MyPrompts({ prompts}) {
    return (
        <div className="min-h-screen bg-[#F0FBFC] py-10 px-4">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-[#3F4255]">
                    My Prompts
                </h1>

                <p className="text-sm text-[#667085] mt-1">
                    Manage your created prompts
                </p>
            </div>

            {/* TABLE CARD */}
            <Card className="max-w-7xl mx-auto border border-[#d8edf0] shadow-xl rounded-3xl overflow-hidden">

                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="My Prompts">

                            {/* TABLE HEADER */}
                            <Table.Header>

                                <Table.Column
                                    isRowHeader
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Title
                                </Table.Column>

                                <Table.Column
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Category
                                </Table.Column>

                                <Table.Column
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Visibility
                                </Table.Column>

                                <Table.Column
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Copy Count
                                </Table.Column>

                                <Table.Column
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Status
                                </Table.Column>

                                <Table.Column
                                    className="bg-[#F8FAFC] text-[#3F4255] text-center"
                                >
                                    Actions
                                </Table.Column>

                            </Table.Header>

                            {/* TABLE BODY */}
                            <Table.Body>

                                {prompts?.length > 0 ? (
                                    prompts.map((prompt) => (
                                        <Table.Row
                                            key={prompt._id}
                                            className="hover:bg-[#F0FBFC] transition"
                                        >

                                            <Table.Cell className="font-medium text-[#3F4255]">
                                                {prompt.title}
                                            </Table.Cell>

                                            <Table.Cell className="text-[#667085]">
                                                {prompt.category}
                                            </Table.Cell>

                                            <Table.Cell className="text-[#667085] capitalize">
                                                {prompt.visibility}
                                            </Table.Cell>

                                            <Table.Cell className="text-[#667085]">
                                                {prompt.copyCount}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium
                                                    ${prompt.status === 'approved'
                                                            ? 'bg-green-100 text-green-700'
                                                            : prompt.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {prompt.status}
                                                </span>
                                            </Table.Cell>

                                            {/* ACTIONS */}
                                            <Table.Cell>
                                                <div className="flex gap-3 flex-wrap justify-center">

                                                    {/* <PromptDetailsButton
                                                        prompt={prompt}
                                                    /> */}

                                                    <UpdatePromptModal
                                                        prompt={prompt}
                                                        
                                                    />

                                                    <DeletePromptModal
                                                        prompt={prompt}
                                                        
                                                    />

                                                </div>
                                            </Table.Cell>

                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>
                                            <div className="flex flex-col items-center justify-center py-14 text-center">

                                                <div className="w-14 h-14 rounded-2xl bg-[#F0FBFC] border border-[#d8edf0] flex items-center justify-center mb-4">
                                                    🤖
                                                </div>

                                                <h3 className="text-lg font-semibold text-[#3F4255]">
                                                    No Prompts Found
                                                </h3>

                                                <p className="text-sm text-[#667085] mt-1">
                                                    You have not created any prompts yet.
                                                </p>

                                                <Link
                                                    href="/add-prompt"
                                                    className="mt-5"
                                                >
                                                    <Button className="bg-[#14B8A6] text-white">
                                                        Create Prompt
                                                    </Button>
                                                </Link>

                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}

                            </Table.Body>

                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>

            </Card>
        </div>
    );
}