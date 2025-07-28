'use client';

import { BreadCrumb } from 'primereact/breadcrumb';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Editor } from 'primereact/editor';
import {
  countries,
  indicatorOptions,
  items,
  productType,
  videoTypeOptions,
} from '@/data/product/items';
import { ProductInputType } from '@/data/product/types';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, GET_SELLER } from '@/graphql/product';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { GET_BRANDS } from '@/graphql/brand/query';
import { GET_CATEGORIES } from '@/graphql/category/query';
import { useCreateProduct } from '@/hooks/product/useCreateProduct';
import { useRouter } from 'next/navigation';
import { getIsAdmin, getUser } from '@/util/storageUtils';
import { InputSwitch } from 'primereact/inputswitch';
import AddAttibute from '@/components/product/AddAttribute';
import AddVariants from '@/components/product/AddVariants';
import AdditionalInfo from '@/components/product/AdditionalInfo';
import MediaPicker from '@/components/media/MediaPicker';
import { Image } from 'primereact/image';

export default function AddProduct() {
  const [visibleMainImage, setVisibleMainImage] = useState(false);
  const [visibleOtherImage, setVisibleOtherImage] = useState(false);
  const [visibleVideImage, setVisibleVideImage] = useState(false);

  const [isAdmin, setAdmin] = useState(false);
  console.log(isAdmin);
  const router = useRouter();

  const [attributes, setAttributes] = useState<any>([]);
  const [createProductVariantInput, setCreateProductVariantInput] =
    useState<any>([]);
  const [addtionalInfo, setAdditionalInfo] = useState<any>({});

  const [isSaveSettings, setSaveSettings] = useState(true);

  const { data: sellerList } = useQuery(GET_SELLER, {
    variables: { limit: 1000, offset: 0, status: 'active' },
    fetchPolicy: 'no-cache',
  });
  const { data: brandList } = useQuery(GET_BRANDS, {
    variables: { limit: 1000, offset: 0 },
    fetchPolicy: 'no-cache',
  });

  const { data: categoryList } = useQuery(GET_CATEGORIES, {
    variables: {
      getCategoriesInput: {
        limit: 1000,
        offset: 0,
      },
    },
    fetchPolicy: 'no-cache',
  });
  const [
    createProduct,
    { loading: createProductLoading, data: creaProductData },
  ] = useMutation(CREATE_PRODUCT);
  const { register, setValue, watch, handleSubmit } = useForm<ProductInputType>(
    {
      defaultValues: {
        product_type: 'PHYSICAL_PRODUCT',
        type_of_product: 'none',
        stock_management: false,
        stockType: 'none',
        isSaveSettings: false,
      },
    },
  );

  useEffect(() => {
    const admin = getIsAdmin();
    if (!admin) {
      const user = getUser();
      setValue('seller_id', user?._id);
      setAdmin(admin);
    } else {
      setAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (creaProductData) {
      router.push('/kocart/product/product-list');
    }
  }, [creaProductData]);

  const countryOptions = countries.map(c => ({ label: c.name, value: c.code }));

  const submitHandler = async (values: ProductInputType) => {
    try {
      await useCreateProduct(
        values,
        addtionalInfo,
        attributes,
        createProductVariantInput,
        createProduct,
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <BreadCrumb className="m-4" model={items} />
      <Card className="m-4">
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Product Name<span className="text-red-500">*</span>
          </p>
          <InputText
            {...register('pro_input_name')}
            className="block w-full"
            id="username"
            placeholder="Product Name"
          />
        </div>
        <div className="justfy-content-between flex gap-4">
          {isAdmin ? (
            <div className="flex-column flex w-6">
              <p className="mb-2 font-semibold">
                Seller<span className="text-red-500">*</span>
              </p>
              <Select
                options={
                  sellerList?.sellers?.sellers?.length
                    ? sellerList.sellers.sellers.map((s: any) => ({
                        label: s.account_name,
                        value: s._id,
                      }))
                    : ''
                }
                onChange={(option: any) => {
                  setValue('seller_id', option?.value);
                }}
                isClearable
              />
            </div>
          ) : (
            ''
          )}
          <div className="flex-column flex w-6">
            <p className="mb-2 font-semibold">
              Product Type<span className="text-red-500">*</span>
            </p>
            <Select
              options={productType}
              onChange={(option: any) => {
                setValue('product_type', option.value);
                option.value === 'DIGITAL_PRODUCT'
                  ? setValue('type_of_product', 'digital')
                  : setValue('type_of_product', 'simple');
              }}
              defaultValue={productType[1]}
              isClearable
            />
          </div>
        </div>
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Short Description<span className="text-red-500">*</span>
          </p>
          <InputTextarea
            rows={3}
            cols={4}
            {...register('short_description')}
            className="block w-full"
            id="username"
            placeholder="Short description"
          />
        </div>
        <div className="flex-column flex">
          <p className="mb-2 font-semibold">
            Tags{' '}
            <span className="text-sm">
              (These tags help you in search result)
            </span>
          </p>
          <Chips
            className="w-full"
            value={watch('tags')}
            onChange={e => setValue('tags', e?.value || [])}
          />
        </div>
        <div>
          <div className="justfy-content-between flex flex-wrap">
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Indicator</p>
                <Select
                  options={indicatorOptions}
                  onChange={(value: any) => setValue('indicator', value.value)}
                />
              </div>
            ) : (
              ''
            )}
            <div className="flex-column flex w-3 pr-3">
              <p className="mb-2 font-semibold">Made In</p>
              <Select
                options={countryOptions}
                onChange={(value: any) => setValue('made_in', value.value)}
              />
            </div>
            <div className="flex-column flex w-3 pr-3">
              <p className="mb-2 font-semibold">Brand</p>
              <Select
                options={
                  brandList?.adminBrandList?.brands?.length
                    ? brandList?.adminBrandList?.brands.map((d: any) => ({
                        label: d.name,
                        value: d._id,
                      }))
                    : []
                }
                onChange={(option: any) => setValue('brand', option.value)}
              />
            </div>
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Total Allowed Quantity</p>
                <InputNumber
                  placeholder="Total Allowed Quantity"
                  style={{ height: '37px' }}
                  value={watch('total_allowed_quantity')}
                  onChange={e =>
                    setValue('total_allowed_quantity', e?.value || 0)
                  }
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Minimum Order Quantity</p>
                <InputNumber
                  placeholder="Minimum Order Quantity"
                  style={{ height: '37px' }}
                  value={watch('minimum_order_quantity')}
                  onChange={e =>
                    setValue('minimum_order_quantity', e?.value || 0)
                  }
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Quantity Step Size</p>
                <InputNumber
                  placeholder="Quantity Step Size"
                  style={{ height: '37px' }}
                  value={watch('quantity_step_size')}
                  onChange={e => setValue('quantity_step_size', e?.value || 0)}
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Warranty Period</p>
                <InputText
                  placeholder="Warranty period"
                  style={{ height: '37px' }}
                  value={watch('warranty_period')}
                  onChange={e =>
                    setValue('warranty_period', e.target.value || '')
                  }
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Guarantee Period</p>
                <InputText
                  placeholder="Guarantee period"
                  style={{ height: '37px' }}
                  value={watch('guarantee_period')}
                  onChange={e =>
                    setValue('guarantee_period', e.target.value || '')
                  }
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Is Returnable</p>
                <InputSwitch
                  checked={watch('is_returnable') ? true : false}
                  placeholder="Warranty period"
                  onChange={e => setValue('is_returnable', e.value)}
                />
              </div>
            ) : (
              ''
            )}
            {watch('product_type') === 'PHYSICAL_PRODUCT' ? (
              <div className="flex-column flex w-3 pr-3">
                <p className="mb-2 font-semibold">Is Cancelable</p>
                <InputSwitch
                  checked={watch('is_cancelable') ? true : false}
                  placeholder="Warranty period"
                  onChange={e => setValue('is_cancelable', e.value)}
                />
              </div>
            ) : (
              ''
            )}
            <div className="flex-column flex w-3 pr-3">
              <p className="mb-2 font-semibold">
                Select Category<span className="text-red-500">*</span>
              </p>
              <Select
                options={
                  categoryList?.getAdminCategories?.categories?.length
                    ? categoryList?.getAdminCategories?.categories.map(
                        (d: any) => ({ label: d.name, value: d._id }),
                      )
                    : []
                }
                onChange={(option: any) => setValue('category', option.value)}
              />
            </div>
          </div>
        </div>
        <div className="align-items-center my-3 flex gap-4">
          <p className="font-semibold">Main Image</p>
          <Button
            style={{ height: '40px' }}
            icon="pi pi-upload"
            outlined
            size="small"
            label="Choose File"
            onClick={() => setVisibleMainImage(true)}
          />
          <MediaPicker
            visible={visibleMainImage}
            setVisible={setVisibleMainImage}
            callback={data => setValue('pro_input_image', data?.file || '')}
          />
          {watch('pro_input_image') ? (
            <Image
              style={{ border: '2px solid gray' }}
              src={watch('pro_input_image')}
              width="200"
            />
          ) : (
            ''
          )}
        </div>
        <div className="align-items-center my-3 flex gap-4">
          <p className="font-semibold">Other Images</p>
          <Button
            style={{ height: '40px' }}
            icon="pi pi-upload"
            outlined
            size="small"
            label="Choose Files"
            onClick={() => setVisibleOtherImage(true)}
          />
          <MediaPicker
            visible={visibleOtherImage}
            setVisible={setVisibleOtherImage}
            isMultiple={true}
            callback={data => {
              setValue('other_images', data?.map((d: any) => d.file) || []);
            }}
          />
          {watch('other_images') ? (
            <div>
              {watch('other_images')?.map((d: any) => (
                <Image
                  style={{
                    border: '2px solid gray',
                    marginRight: '5px',
                    display: 'inline-block',
                  }}
                  key={d}
                  src={d}
                  width="200"
                />
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex gap-5">
          <div className="flex-column flex w-6">
            <p className="my-3 font-semibold">Video Type</p>
            <Select
              options={videoTypeOptions}
              onChange={(value: any) => setValue('video_type', value?.value)}
            />
          </div>
          <div className="w-6">
            {watch('video_type') === 'SELF_HOSTED' ? (
              <div className="flex-column flex">
                <p className="my-3 font-semibold">
                  Video <span className="text-red-500">*</span>
                </p>
                <Button
                  style={{ height: '40px' }}
                  icon="pi pi-upload"
                  outlined
                  size="small"
                  label="Choose Files"
                  onClick={() => setVisibleVideImage(true)}
                />
                <MediaPicker
                  visible={visibleVideImage}
                  setVisible={setVisibleVideImage}
                  isMultiple={false}
                  callback={(data: any) => {
                    setValue('video', data.media);
                  }}
                />
              </div>
            ) : (
              ''
            )}
            {watch('video_type') === 'YOUTUBE' ||
            watch('video_type') === 'VIMEO' ? (
              <div className="flex-column flex">
                <p className="mb-2 font-semibold">
                  Video Link <span className="text-red-500">*</span>
                </p>
                <InputText
                  {...register('video')}
                  className="block w-full"
                  id="username"
                  placeholder="Paste Youtube or Vimeo video link or url here"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex-column flex">
          <p className="my-3 font-semibold">Additional Info</p>
          <TabView>
            <TabPanel header="General">
              <AdditionalInfo
                productType={watch('product_type')}
                additionalInfo={addtionalInfo}
                setAdditionalInfo={setAdditionalInfo}
                setSaveSettings={setSaveSettings}
              />
            </TabPanel>
            <TabPanel header="Attributes" disabled={isSaveSettings}>
              <AddAttibute
                attributes={attributes}
                isSaveSettings={addtionalInfo?.isSaveSettings}
                setAttributes={setAttributes}
              />
            </TabPanel>
            {addtionalInfo?.type_of_product === 'variable' ? (
              <TabPanel header="Variants">
                <AddVariants
                  attributes={attributes}
                  addtionalInfo={addtionalInfo}
                  createProductVariantInput={createProductVariantInput}
                  setCreateProductVariantInput={setCreateProductVariantInput}
                />
              </TabPanel>
            ) : (
              ''
            )}
          </TabView>
        </div>
        <div className="flex-column flex">
          <p className="my-3 font-semibold">Description</p>
          <Editor
            value={watch('pro_input_description')}
            onTextChange={e => setValue('pro_input_description', e.htmlValue)}
            style={{ height: '320px' }}
          />
        </div>
        <div className="flex-column flex">
          <p className="my-3 font-semibold">Extra Description</p>
          <Editor
            value={watch('extra_input_description')}
            onTextChange={e => setValue('extra_input_description', e.htmlValue)}
            style={{ height: '320px' }}
          />
        </div>
        <Button
          hidden={createProductLoading}
          className="mt-4"
          onClick={handleSubmit(submitHandler)}
        >
          {createProductLoading ? 'Loading...' : 'Submit'}
        </Button>
      </Card>
    </div>
  );
}
