"use client";

import React, { useState } from 'react';
import { getCars, deleteCar, addCar, updateCar } from "@/services/cars";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader, CarDetailsEdit } from '@/components/index';

interface reactQueryProps { }

const reactQuery: React.FC<reactQueryProps> = () => {
    const queryClient = useQueryClient()
    const [isMutating, setIsMutating] = useState(false);
    const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: getCars, staleTime: 10000 })
    console.log("data: ",data);

    const deleteMutation = useMutation({
        mutationFn: deleteCar,
        onMutate: async (id: string) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car._id !== id))
            return { previousCars }
        },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false) },
    })

    const addCarMutation = useMutation({
        mutationFn: addCar,
        onMutate: async (car: any) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => [...old, car])
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false);
        },
    })

    const updateCarMutation = useMutation({
        mutationFn: ({ id, car }: { id: string, car: any }) => updateCar(id, car),
        onMutate: async ({ id, car }: { id: string, car: any }) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.map((oldCar: any) => oldCar._id === id ? car : oldCar))
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false);
        },
    })

    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            model_name: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            plate_number: (form[2] as HTMLInputElement).value,
        }
        addCarMutation.mutate(car);
    };

    const form = () => {
        return (
            <form onSubmit={handleAddCar} className='form-layout'>
                <input type="text" placeholder="model name" defaultValue={data.model_name} />
                <input type="text" placeholder="color" defaultValue={data.color} />
                <input type="text" placeholder="plate number" defaultValue={data.plate_number} />
                <button type="submit">Add Car</button>
            </form>
        );
    }

    return (
        <div>
            {(isLoading || isFetching || isMutating) && <Loader />}
            <h1>Cars</h1>
            {data && form()}
            <br />
            <div className="loader-animation" />
            <div className="containerWrapper">
                {data && data.map((book: any, idx: number) => {
                    return (
                        <CarDetailsEdit
                            key={idx}
                            data={book}
                            onDelete={() => deleteMutation.mutate(book._id)}
                            onUpdate={(car: any) => updateCarMutation.mutate({ id: book._id, car })}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default reactQuery;