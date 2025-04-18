// "use client";

// import { useState, useCallback } from "react";
// import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { toast } from "@/hooks/use-toast";
// import { Icons } from "@/components/icons";
// import { Slider } from "@/components/ui/slider";

// type Guest = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   category: "Family" | "Close Friends" | "Friends";
// };

// const categories = ["Family", "Close Friends", "Friends"] as const;
// const generateId = () => Math.random().toString(36).slice(2);

// export default function Home() {
//   const [guestLimit, setGuestLimit] = useState(100);
//   const [guests, setGuests] = useState<Guest[]>([]);
//   const [newGuest, setNewGuest] = useState<Omit<Guest, "id">>({
//     firstName: "",
//     lastName: "",
//     category: "Family",
//   });
//   const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
//   const [confirmDeleteText, setConfirmDeleteText] = useState("");

//   const handleLimitChange = useCallback((value: number[]) => {
//     setGuestLimit(value[0]);
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewGuest((g) => ({ ...g, [name]: value }));
//   };

//   const handleAddGuest = () => {
//     if (!newGuest.firstName.trim() || !newGuest.lastName.trim()) {
//       return toast({ title: "Missing name", description: "First & last required", variant: "destructive" });
//     }
//     if (guests.length >= guestLimit) {
//       return toast({ title: "Guest list full", description: `Max is ${guestLimit}`, variant: "destructive" });
//     }
//     setGuests((list) => [...list, { id: generateId(), ...newGuest }]);
//     setNewGuest({ firstName: "", lastName: "", category: "Family" });
//   };

//   const openDelete = (idx: number) => setDeleteIndex(idx);
//   const closeDelete = () => {
//     setDeleteIndex(null);
//     setConfirmDeleteText("");
//   };
//   const confirmDelete = () => {
//     if (confirmDeleteText.toLowerCase() !== "delete") {
//       return toast({ title: "Type 'delete' to confirm", variant: "destructive" });
//     }
//     setGuests((list) => list.filter((_, i) => i !== deleteIndex));
//     closeDelete();
//   };

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;
//     const items = Array.from(guests);
//     const [moved] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, moved);
//     setGuests(items);
//   };

//   return (
//     <div className="min-h-screen bg-background p-6 flex flex-col items-center">
//       {/* WedRanker Title */}
//       <div className="w-full mb-8 p-6 bg-card rounded-2xl shadow-lg">
//         <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-indigo-600 drop-shadow-md">
//           WedRanker
//         </h1>
//       </div>

//       {/* Guest Limit Input */}
//       <div className="w-full max-w-2xl mb-12">
//         <Label htmlFor="guestLimit" className="text-lg font-bold">
//           Guest Limit: {guestLimit}
//         </Label>
//         <Slider
//           defaultValue={[100]}
//           max={250}
//           min={10}
//           step={1}
//           onValueChange={handleLimitChange}
//         />
//       </div>

//       {/* Add Guest Form */}
//       <Card className="w-full max-w-2xl mb-8 rounded-lg border bg-card text-card-foreground shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold leading-none tracking-tight">Add Guest</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-3 gap-4 pt-8">
//           <div>
//             <Label htmlFor="firstName">First Name</Label>
//             <Input
//               id="firstName"
//               name="firstName"
//               value={newGuest.firstName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="lastName">Last Name</Label>
//             <Input
//               id="lastName"
//               name="lastName"
//               value={newGuest.lastName}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="col-span-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               name="category"
//               className="w-full rounded-md border border-input bg-background px-3 py-2 text-base"
//               value={newGuest.category}
//               onChange={handleInputChange}
//             >
//               {categories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <Button className="col-span-1 self-end" onClick={handleAddGuest}>
//             Add Guest
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Draggable guest list */}
//       {guests.length > 0 && (
//         <Card className="w-full max-w-2xl rounded-lg border bg-card text-card-foreground shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold leading-none tracking-tight">
//               Guest List ({guests.length}/{guestLimit})
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Droppable
//                 droppableId="guest-list"
//                 isDropDisabled={false}
//                 isCombineEnabled={false}
//                 ignoreContainerClipping={true}
//               >
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="overflow-auto"
//                   >
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Rank</TableHead>
//                           <TableHead>Name</TableHead>
//                           <TableHead>Category</TableHead>
//                           <TableHead className="text-right">Actions</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {guests.map((g, idx) => (
//                           <Draggable key={g.id} draggableId={g.id} index={idx}>
//                             {(p) => {
//                               const bgClass =
//                                 g.category === "Family"
//                                   ? "bg-pink-100"
//                                   : g.category === "Close Friends"
//                                   ? "bg-blue-100"
//                                   : "";
//                               return (
//                                 <TableRow
//                                   ref={p.innerRef}
//                                   {...p.draggableProps}
//                                   {...p.dragHandleProps}
//                                   className={`${bgClass} hover:bg-muted cursor-move`}
//                                 >
//                                   <TableCell>{idx + 1}</TableCell>
//                                   <TableCell>
//                                     {g.firstName} {g.lastName}
//                                   </TableCell>
//                                   <TableCell>{g.category}</TableCell>
//                                   <TableCell className="text-right">
//                                     <AlertDialog>
//                                       <AlertDialogTrigger asChild>
//                                         <Button variant="ghost" size="icon">
//                                           <Icons.trash className="h-4 w-4" />
//                                         </Button>
//                                       </AlertDialogTrigger>
//                                       <AlertDialogContent>
//                                         <AlertDialogHeader>
//                                           <AlertDialogTitle>
//                                             Confirm Deletion
//                                           </AlertDialogTitle>
//                                           <AlertDialogDescription>
//                                             Type <code>delete</code> to remove this
//                                             guest.
//                                           </AlertDialogDescription>
//                                         </AlertDialogHeader>
//                                         <Input
//                                           placeholder="delete"
//                                           value={confirmDeleteText}
//                                           onChange={(e) =>
//                                             setConfirmDeleteText(e.target.value)
//                                           }
//                                           className="mt-4"
//                                         />
//                                         <AlertDialogFooter>
//                                           <AlertDialogCancel onClick={closeDelete}>
//                                             Cancel
//                                           </AlertDialogCancel>
//                                           <AlertDialogAction
//                                             onClick={confirmDelete}
//                                             disabled={
//                                               confirmDeleteText.toLowerCase() !==
//                                               "delete"
//                                             }
//                                           >
//                                             Delete
//                                           </AlertDialogAction>
//                                         </AlertDialogFooter>
//                                       </AlertDialogContent>
//                                     </AlertDialog>
//                                   </TableCell>
//                                 </TableRow>
//                               );
//                             }}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </TableBody>
//                     </Table>
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
