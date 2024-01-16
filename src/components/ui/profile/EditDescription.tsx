"use client"

import { FaEdit } from "react-icons/fa";
import { Button } from "../button";

export function EditDescription() {
    return (
        <Button variant="icon" >
            <FaEdit className="h-fit w-fit"/> Change Description
        </Button>
    )
}