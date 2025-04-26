import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceholderViewProps {
  title: string
}

export function PlaceholderView({ title }: PlaceholderViewProps) {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">This section is under development</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
