import http from "@/services/http";

export async function getCars() {
    try {
        const response = await http.get("/cars");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function addCar(car: any) {
    try {
        const response = await http.post("/cars", car);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function updateCar(id: string, car: any) {
    try {
        const response = await http.patch('/cars', { ...car, _id: id });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function deleteCar(id: string) {
    try {
        const response = await http.delete(`/cars/${id}`);
        console.log(id);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

