import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { CustomTextarea } from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { CgArrowLeft } from 'react-icons/cg';

export default function ProductForm({...props}) {

    const { product, isView, isEdit } = props;


    const { data, setData, post, processing, errors, reset } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        featured_image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });


    const submit : FormEventHandler =  (e) => {
        e.preventDefault();

        if(isEdit){
                        
            post(route('products.update', product.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            });

        }else{
            post(route('products.store'),{
                onSuccess: () => reset(),
            });
        }
    };

    /** FIle Handler */
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0 ){
            setData('featured_image', e.target.files[0])
        }
    };
  
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isView?"Show": (isEdit ? "Update" : "Create")} Product
                </h2>
            }
        >
            <Head title="Create Product" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">                    
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">                        
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between text-xl font-semibold mb-4 border-b pb-2 w-full">
                                <span>{isView?"Show": (isEdit ? "Update" : "Create")} Product</span>
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    href={route('products.index')}
                                    as="button"
                                    className="flex items-center bg-indigo-800 px-2 py-1 rounded-lg text-white text-md cursor-pointer hover:opacity-90 mt-2 mr-2"
                                >
                                    <CgArrowLeft className='me-2' />
                                    Back to Products
                                </Link>
                            </div>
                            
                            <div>
                                <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off' >
                                    { /* Product Name */}
                                    <div className='grid gap-6'>
                                        <div className='grid gap-2'>
                                            <InputLabel htmlFor='name'>Product Name</InputLabel> 
                                            <TextInput
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}  
                                            id="name"
                                            name="name"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            placeholder='Product Name'
                                            autoComplete="name" 
                                            disabled={isView || processing}
                                             />

                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />

                                        </div>
                                    </div>

                                    { /* Product Description */}
                                    <div className='grid gap-6'>
                                        <div className='grid gap-2'>
                                            <InputLabel htmlFor='description'>Product Description</InputLabel> 
                                            <CustomTextarea
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)} 
                                                id="description"
                                                name="description"
                                                tabIndex={2}
                                                placeholder='Product Description'
                                                disabled={isView || processing}                                                
                                            />
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    { /* Product Price */}
                                    <div className='grid gap-6'>
                                        <div className='grid gap-2'>
                                            <InputLabel htmlFor='price'>Price</InputLabel> 
                                            <TextInput
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}   
                                            id="price"
                                            name="price"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            placeholder='Product Price'
                                            required
                                            disabled={isView || processing}
                                            />
                                            <InputError
                                                message={errors.price}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    { /* Featured Image */}
                                    <div className='grid gap-6'>
                                       
                                            {!isView && (
                                                 <div className='grid gap-2'>                                                
                                                    <InputLabel htmlFor='featured_image'>Featured Image</InputLabel> 
                                                    <TextInput
                                                    onChange={handleFileUpload} 
                                                    type="file" 
                                                    id="featured_image"
                                                    name="featured_image"
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    />
                                                    <InputError
                                                        message={errors.featured_image}
                                                        className="mt-2"
                                                    />
                                                 </div>
                                            )} 
                                            
                                            
                                            { (isView || isEdit) && (
                                                 <div className='grid gap-2'>                                                
                                                    <InputLabel htmlFor='featured_image'>Current Featured Image</InputLabel> 
                                                    <img src={product.featured_image ? `/storage/${product.featured_image}` : '/placeholder.png'} alt='Featured Image' className='h-16 w-16 object-cover' />
                                                 </div>
                                            )}
                                       
                                    </div>
                                    
                                    { !isView && (           
                                    <div className="mt-4 flex items-center justify-start">
                                        <PrimaryButton className="">
                                            {processing && <BiLoaderCircle className='h-4 w-4 animate-spin' />}
                                            { processing ? (isEdit ? 'Updating...' : 'Creating'):
                                            isEdit ? 'Update' : 'Create'} Product
                                        </PrimaryButton>
                                    </div>
                                    )}
                                </form>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
