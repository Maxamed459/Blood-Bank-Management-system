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
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-4">
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Total Blood Donors</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         1,250
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">Total Blood Donors</div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Total Blood Litters</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         1,250.00 L
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total Blood litters available now
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>

    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Successful Donations</CardDescription>
    //       <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         898
    //       </CardTitle>
    //     </CardHeader>
    //     <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //       <div className="text-muted-foreground">
    //         Total successful donations recorded.
    //       </div>
    //     </CardFooter>
    //   </Card>
    // </div>
    <div className="space-y-4 px-4 lg:px-6">
      {/* First row: 3 columns */}
      <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Blood Donors</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,250
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-muted-foreground">Total Blood Donors</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Blood Liters</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,250.00 L
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-muted-foreground">
              Total Blood liters available now
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Successful Donations</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              898
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-muted-foreground">
              Total successful donations recorded.
            </div>
          </CardFooter>
        </Card>
      </div>
      <h2></h2>
      {/* Second row: 6 columns */}
      <div className="grid grid-cols-2 gap-2 @xl/main:grid-cols-4">
        {BloodArray.map((blood, i) => (
          <Card key={i} className="@container/card">
            <CardHeader>
              <CardDescription>{blood.type}</CardDescription>
              <CardTitle className="text-2xl font-semibold">
                {blood.amount} L
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
