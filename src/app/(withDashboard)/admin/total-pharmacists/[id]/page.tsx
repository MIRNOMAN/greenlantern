import { PharmacistDetails } from "@/components/ui/PharmacistDetails";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <PharmacistDetails pharmacyId={id} />;
};

export default page;
