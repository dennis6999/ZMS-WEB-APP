import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"

interface ProjectDetailsProps {
  project: {
    id: string
    name: string
    status: string
    startDate: string
    endDate: string
    budget: number
    lead: string
    location: string
    species: string
    description: string
    partners?: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function ProjectDetails({ project, onEdit, onDelete }: ProjectDetailsProps) {
  const getStatusBadge = (status: string) => {
    const statusColors = {
      planning: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      "on-hold": "bg-gray-100 text-gray-800",
    }
    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <div className="mt-2">{getStatusBadge(project.status)}</div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            Edit Project
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{project.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Project Lead</p>
                <p className="font-medium">{project.lead}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">KES {project.budget.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conservation Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Target Species</p>
              <p className="font-medium">{project.species}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="mt-1">{project.description}</p>
            </div>

            {project.partners && (
              <div>
                <p className="text-sm text-gray-500">Partners</p>
                <p className="mt-1">{project.partners}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
          <div className="relative pl-8">
            <div className="mb-8">
              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -ml-1.5"></div>
              <p className="text-sm text-gray-500">Project Start</p>
              <p className="font-medium">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className="absolute left-0 w-3 h-3 bg-green-500 rounded-full -ml-1.5"></div>
              <p className="text-sm text-gray-500">Project End</p>
              <p className="font-medium">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 