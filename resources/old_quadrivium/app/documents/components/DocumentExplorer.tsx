'use client'

import { cn } from '@/lib/utils'
import {
    ChevronDown,
    ChevronRight,
    FileText,
    FileType,
    FolderClosed,
    FolderOpen
} from 'lucide-react'
import { useState } from 'react'
import { DocumentHeader } from './DocumentHeader'
import { DocumentViewer } from './DocumentViewer'

interface Document {
    id: string
    name: string
    type: string
    path: string
    dateAdded: string
    size: string
}

interface Folder {
    id: string
    name: string
    documents: Document[]
    folders: Folder[]
    expanded?: boolean
}

// Mock data for demo
const mockFolders: Folder[] = [
    {
        id: 'communication',
        name: 'Communication with Authorities',
        expanded: true,
        documents: [
            {
                id: 'doc-1',
                name: 'Correspondence with CBD Secretariat.pdf',
                type: 'pdf',
                path: '/communication/cbd-correspondence.pdf',
                dateAdded: '2024-03-15',
                size: '2.1 MB'
            }
        ],
        folders: []
    },
    {
        id: 'mta',
        name: 'Material Transfer Agreements',
        expanded: false,
        documents: [
            {
                id: 'doc-2',
                name: 'MTA Template.docx',
                type: 'docx',
                path: '/mta/mta-template.docx',
                dateAdded: '2024-03-10',
                size: '456 KB'
            }
        ],
        folders: []
    },
    {
        id: 'mat',
        name: 'Mutually Agreed Terms',
        expanded: false,
        documents: [
            {
                id: 'doc-3',
                name: 'MAT Framework.pdf',
                type: 'pdf',
                path: '/mat/mat-framework.pdf',
                dateAdded: '2024-03-12',
                size: '1.8 MB'
            }
        ],
        folders: []
    },
    {
        id: 'patents',
        name: 'Patents',
        expanded: false,
        documents: [
            {
                id: 'doc-4',
                name: 'Patent Applications.pdf',
                type: 'pdf',
                path: '/patents/applications.pdf',
                dateAdded: '2024-03-08',
                size: '3.2 MB'
            }
        ],
        folders: []
    },
    {
        id: 'permits',
        name: 'Permits',
        expanded: false,
        documents: [
            {
                id: 'doc-5',
                name: 'Research Permits.pdf',
                type: 'pdf',
                path: '/permits/research-permits.pdf',
                dateAdded: '2024-03-05',
                size: '2.5 MB'
            }
        ],
        folders: []
    },
    {
        id: 'rnd',
        name: 'R&D Collaboration Agreements',
        expanded: false,
        documents: [
            {
                id: 'doc-6',
                name: 'Collaboration Framework.pdf',
                type: 'pdf',
                path: '/rnd/collaboration-framework.pdf',
                dateAdded: '2024-03-01',
                size: '2.9 MB'
            }
        ],
        folders: []
    },
    {
        id: 'other',
        name: 'Other',
        expanded: false,
        documents: [
            {
                id: 'doc-7',
                name: 'Miscellaneous Documents.pdf',
                type: 'pdf',
                path: '/other/misc-documents.pdf',
                dateAdded: '2024-03-20',
                size: '1.5 MB'
            }
        ],
        folders: []
    }
]

const TypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'pdf':
            return <FileText className='h-3.5 w-3.5 text-red-600' />
        case 'docx':
            return <FileText className='h-3.5 w-3.5 text-accent-blue-600' />
        case 'xlsx':
            return <FileText className='h-3.5 w-3.5 text-green-600' />
        default:
            return <FileType className='h-3.5 w-3.5 text-gray-600' />
    }
}

const FolderItem = ({
    folder,
    level = 0,
    onToggleExpand,
    onSelectDocument,
    selectedDocument
}: {
    folder: Folder
    level?: number
    onToggleExpand: (folderId: string) => void
    onSelectDocument: (document: Document) => void
    selectedDocument: Document | null
}) => {
    return (
        <div className='select-none py-0.5'>
            <div
                className='flex items-center hover:bg-gray-100 rounded-lg px-2.5 py-1.5 cursor-pointer mx-1'
                onClick={() => onToggleExpand(folder.id)}
            >
                <span className='mr-1.5'>
                    {folder.expanded ? (
                        <ChevronDown className='h-3.5 w-3.5 text-gray-500' />
                    ) : (
                        <ChevronRight className='h-3.5 w-3.5 text-gray-500' />
                    )}
                </span>
                <span className='mr-2'>
                    {folder.expanded ? (
                        <FolderOpen className='h-4 w-4 text-accent-blue-600' />
                    ) : (
                        <FolderClosed className='h-4 w-4 text-accent-blue-600' />
                    )}
                </span>
                <span className='text-xs font-medium text-gray-700'>
                    {folder.name}
                </span>
            </div>

            {folder.expanded && (
                <div className='ml-5 mt-0.5'>
                    {folder.documents.map((document) => (
                        <div
                            key={document.id}
                            className={cn(
                                'flex items-center hover:bg-gray-100 rounded-lg px-2.5 py-1.5 cursor-pointer mx-1 my-0.5',
                                selectedDocument?.id === document.id
                                    ? 'bg-accent-blue-50 text-accent-blue-700 hover:bg-accent-blue-100'
                                    : 'text-gray-700'
                            )}
                            onClick={() => onSelectDocument(document)}
                        >
                            <TypeIcon type={document.type} />
                            <span className='text-xs ml-2 truncate'>
                                {document.name}
                            </span>
                        </div>
                    ))}

                    {folder.folders.map((subFolder) => (
                        <FolderItem
                            key={subFolder.id}
                            folder={subFolder}
                            level={level + 1}
                            onToggleExpand={onToggleExpand}
                            onSelectDocument={onSelectDocument}
                            selectedDocument={selectedDocument}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export function DocumentExplorer() {
    const [folders, setFolders] = useState<Folder[]>(mockFolders)
    const defaultDocument = mockFolders[0].documents[0]
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(
        defaultDocument
    )
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [searchQuery, setSearchQuery] = useState('')

    const handleToggleExpand = (folderId: string) => {
        setFolders((prevFolders) => {
            return prevFolders.map((folder) => {
                if (folder.id === folderId) {
                    return { ...folder, expanded: !folder.expanded }
                } else if (folder.folders.some((f) => f.id === folderId)) {
                    return {
                        ...folder,
                        folders: folder.folders.map((subFolder) =>
                            subFolder.id === folderId
                                ? {
                                      ...subFolder,
                                      expanded: !subFolder.expanded
                                  }
                                : subFolder
                        )
                    }
                }
                return folder
            })
        })
    }

    const handleSelectDocument = (document: Document) => {
        setSelectedDocument(document)
    }

    return (
        <div className='h-full w-full flex flex-col overflow-hidden'>
            <div className='border-b border-gray-200'>
                <DocumentHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
            </div>

            <div className='flex flex-1 overflow-hidden'>
                {/* Sidebar */}
                <div className='w-64 flex flex-col border-r border-gray-200 bg-white'>
                    {/* Folder tree */}
                    <div className='overflow-auto flex-1 py-2'>
                        {folders.map((folder) => (
                            <FolderItem
                                key={folder.id}
                                folder={folder}
                                onToggleExpand={handleToggleExpand}
                                onSelectDocument={handleSelectDocument}
                                selectedDocument={selectedDocument}
                            />
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className='flex-1 flex flex-col bg-white'>
                    <div className='flex-1 overflow-auto bg-white'>
                        {selectedDocument ? (
                            <DocumentViewer
                                document={selectedDocument}
                                onBackClick={() => setSelectedDocument(null)}
                            />
                        ) : (
                            <div className='p-8 flex items-center justify-center h-full text-center'>
                                <div>
                                    <FileText className='h-12 w-12 mx-auto mb-3 text-gray-200' />
                                    <h3 className='text-base font-medium text-gray-700'>
                                        No document selected
                                    </h3>
                                    <p className='text-xs mt-2 max-w-md text-gray-500'>
                                        Select a document from the sidebar to
                                        view its contents
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
