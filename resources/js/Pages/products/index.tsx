import { CustomTable } from '@/Components/custom-table';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Pagination } from '@/Components/ui/pagination';
import { ProductTableConfig } from '@/config/tables/product-table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Input } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';



interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    featured_image_original_name: string;
    created_at: string;
}

interface ProductPagination {
    data: Product[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface IndexProps {
    products: ProductPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({ products, filters, totalCount, filteredCount }: IndexProps) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(false);

    // When flashMessage changes (new action triggered), show the alert
    useEffect(() => {
    if (flashMessage) {
        setShowAlert(true);
    }
    }, [flashMessage]);

    
    useEffect(() => {
        if(flashMessage){
           const timer = setTimeout(() => setShowAlert(false), 3000);
           return () => clearTimeout(timer);
        }
    }, [flashMessage]); 

    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    // Handle Change for the Search Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),
        };

        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

     // To Reset Applied Filter
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.get(
            route('products.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Handle Per Page Change
    const handlePerPageChange = (value: string) => {
        setData('perPage', value);

        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handle Delete
    const handleDelete = (id: number, route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            router.delete(route, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Products
                </h2>
            }
        >
            <Head title="Manage Products" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">                    
                    { showAlert && flashMessage && (
                    <Alert className={`${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white`}>
                        <AlertTitle>{flash?.success ? 'Sucess' : 'Error'}</AlertTitle>
                        <AlertDescription>{flashMessage}</AlertDescription>
                    </Alert>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <Input
                            type="text"
                            value={data.search}
                            onChange={handleChange}
                            className="h-10 w-1/2"
                            placeholder="Search Product..."
                            name="search"
                        />

                        <Button onClick={handleReset} className="h-10 cursor-pointer bg-red-600 hover:bg-red-500">
                            
                        </Button>
                        
                        <div className="flex">
                            <div className='ml-auto'>
                                <Link className='flex items-center bg-indigo-800 px-2 py-1 rounded-lg text-white text-md cursor-pointer hover:opacity-90 mt-2 mr-2' as='button' href={route('products.create')}>
                                    <CiCirclePlus className='me-2'/>
                                    Add Procuct
                                </Link>
                            </div>
                        </div>
                        
                        <div className="p-6 text-gray-900">
                            <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>

                                 <CustomTable
                                    columns={ProductTableConfig.columns}
                                    actions={ProductTableConfig.actions}
                                    data={products.data}
                                    from={products.from}
                                    onDelete={handleDelete}
                                />

                                 {/* Pagination */}
                                <Pagination
                                    products={products}
                                    perPage={data.perPage}
                                    onPerPageChange={handlePerPageChange}
                                    totalCount={totalCount}
                                    filteredCount={filteredCount}
                                    search={data.search}
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
