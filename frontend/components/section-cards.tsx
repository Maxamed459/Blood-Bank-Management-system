import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BloodArray = [
  {
    type: "A_POSITIVE",
    amount: 15,
  },
  {
    type: "A_NEGATIVE",
    amount: 11,
  },
  {
    type: "B_POSITIVE",
    amount: 13,
  },
  {
    type: "B_NEGATIVE",
    amount: 7,
  },
  {
    type: "O_POSITIVE",
    amount: 3,
  },
  {
    type: "O_NEGATIVE",
    amount: 2,
  },
  {
    type: "AB_POSITIVE",
    amount: 55,
  },
  {
    type: "AB_NEGATIVE",
    amount: 19,
  },
];


export function SectionCards() {
  return (
    <div className="max-w-[95%] min-w-full mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BloodArray.map((blood) => (
          <Card key={blood.type} className="flex flex-row items-center justify-between p-4 border border-gray-200">
            <CardHeader>
              <CardTitle>{blood.type}</CardTitle>
              <CardDescription>{blood.amount} units</CardDescription>
            </CardHeader>
            <div className="p-2 bg-red-100 dark:bg-red-0\50 rounded-full">
              <img src= {blood.type.split("_")[1] === "POSITIVE" ? '/blood_positive.svg' : '/blood_negative.svg'} alt="blood icon" className="w-8" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
