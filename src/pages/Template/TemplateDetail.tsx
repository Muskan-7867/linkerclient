import React from "react";
import { useParams } from "react-router-dom";
import LightTempForm from "../../components/Forms/LightTempForm";
import DarkTempForm from "../../components/Forms/DarkTempForm";


const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Conditional rendering based on the selected template ID
  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="  rounded-lg w-full mtext-center">


        {id === "1" && (
          <LightTempForm />
        )}

        {id === "2" && (
          <DarkTempForm />
        )}
      </div>
    </div>
  );
};

export default TemplateDetail;
