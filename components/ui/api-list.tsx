import { useOrigin } from "@/hooks/use-origin";
import { ApiAlert } from "./api-alert";
import { useParams } from "next/navigation";

export const ApiList = ({
  entityName,
  entityId,
}: {
  entityName: string;
  entityId: string;
}) => {
  const origin = useOrigin();
  const params = useParams();
  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
        <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
       <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
    </>
  );
};
