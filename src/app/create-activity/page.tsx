"use client";

import {
  FormField,
  Form,
  FormItem,
  FormDescription,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { activitySchema } from "@/schemas/activitySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tipSchema } from "@/schemas/tipSchema";
import { BiCurrentLocation } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  INITIAL_COST_VALUE,
  INITIAL_PARTICIPANTS_VALUE,
} from "@/constants/create-activity";
import { Dropzone } from "@/components/create-tips/dropzone";
import { TipList } from "@/components/create-tips/tip-list";

export default function CreateActivity() {
  const activityForm = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      location: "Anywhere",
    },
  });

  const tipForm = useForm<z.infer<typeof tipSchema>>({
    resolver: zodResolver(tipSchema),
  });

  function onSubmit(values: z.infer<typeof activitySchema & typeof tipForm>) {
    console.log(values);
  }

  return (
    <section className="p-16">
      <h1>Share your activity</h1>
      <Form {...activityForm}>
        <form
          onSubmit={activityForm.handleSubmit(onSubmit)}
          className="space-y-6 mt-4"
        >
          <FormField
            control={activityForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    placeholder="What's the activity?"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={activityForm.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      className="rounded-xl"
                      placeholder="Location"
                      {...field}
                    ></Input>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={activityForm.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue
                        className="!text-left"
                        placeholder="Choose a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="diy">DIY</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="busywork">Busywork</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

<h2>Photos & Tips</h2>

<TipList/>
<Dropzone/>

          <FormField
            control={activityForm.control}
            name="cost"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <div className="border p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="block">
                        {value ?? INITIAL_COST_VALUE}
                      </span>
                      <span className="block font-light text-sm">
                        Cost (USD)
                      </span>
                    </div>
                    <Slider
                      defaultValue={[1]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Rate the cost of your activity on a scale from 1 to 10, with 1
                  being the least expensive and 10 being the most expensive.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={activityForm.control}
            name="participants"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Participants</FormLabel>
                <FormControl>
                  <div className="border p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex justify-between">
                      <span className="block">
                        {value ?? INITIAL_PARTICIPANTS_VALUE}
                      </span>
                      <span className="block font-light text-sm">Total</span>
                    </div>
                    <Slider
                      defaultValue={[1]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
                <FormDescription>
                Adjust the number of participants for your activity using the slider. 
  Move the slider to select the desired number of participants within the range of 1 to 100.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button className="bg-mainGreen rounded-full p-6 px-8" type="submit">Post</Button>
        </form>
      </Form>
    </section>
  );
}

/*   const [name, setName] = useState("");
  const [participants, setParticipants] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [price, setPrice] = useState("");
  const [tipText, setTipText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [activityId, setActivityId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el ID de la actividad creada
  const handleSubmitActivity = async (e) => {
    e.preventDefault();

    // Datos de la actividad a crear
    const activityData = {
      name,
      accessibility: parseInt(accessibility),
      participants: parseInt(participants),
      price: parseInt(price),
    };

    // Datos del tip a crear
    const tipData = {
      text: tipText,
      image_url: imageUrl,
    };

    try {
      const response = await fetch("create-activity/api/activities", {
        method: "POST",
        body: JSON.stringify({ activityData, tipData }), // Send both activity and tip data
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Obtiene el ID de la actividad creada desde la respuesta
          const newActivityId = data.activity_id;
          setActivityId(newActivityId); // Almacena el ID en el estado
          // Limpia los campos del formulario después de la inserción exitosa
          setName("");
          setParticipants("");
          setAccessibility("");
          setPrice("");
          setTipText("");
          setImageUrl("");
          // Muestra el mensaje de éxito
          setSuccessMessage("Activity and tip created successfully!");
        } else {
          console.error("Error al crear actividad:", data.error);
        }
      } else {
        console.error("Error al crear actividad:", response.status);
      }
    } catch (error) {
      console.error("Error al crear actividad:", error);
    }
  };

  return (
    <div>
      <h1>Create Activity</h1>
      <form onSubmit={handleSubmitActivity}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Accessibility:
            <input
              type="text"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Participants:
            <input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Tip Text:
            <input
              type="text"
              value={tipText}
              onChange={(e) => setTipText(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Activity</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div> */
