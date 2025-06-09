'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';
import { useState } from 'react';
import { Label } from './ui/label';
import { Star } from 'lucide-react';
export const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      region: '',
      method: 'upload',
      diagnosisHelpful: 3,
      drugAdviceClear: 'yes',
      nearbyHelp: 'yes',
      learnMore: [],
      comments: '',
      consent: false,
    },
  });

  const onSubmit = (data) => {
    console.log('Feedback submitted:', data);
    setSubmitted(true);
  };
  return (
    <>
<Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-3xl md:text-4xl font-semibold text-center">
            🗣 Kami Sangat Mengharapkan Masukan Anda
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {submitted ? (
           <div className="text-center text-green-600 font-medium text-base md:text-lg py-8">
              ✅ Terima kasih! Masukan Anda membantu meningkatkan akses kesehatan untuk semua orang.
            </div>
          ) : (
            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-15 gap-y-6 items-start">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Nama Anda (Optional)</FormLabel>
                      <FormControl><Input placeholder="e.g. Ria from NTT" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Provinsi / Kota</FormLabel>
                      <FormControl><Input placeholder="e.g. Nusa Tenggara Timur" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apakah Anda menggunakan unggah gambar atau kamera?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upload">Mengunggah</SelectItem>
                          <SelectItem value="camera">Kamera</SelectItem>
                          <SelectItem value="both">Keduanya</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diagnosisHelpful"
                  render={({ field }) => {
                    const [hover, setHover] = useState(null);

                    return (
                      <FormItem className="col-span-2">
                        <FormLabel className={'text-base md:text-xl'}>Apakah Diagnosisnya membantu?</FormLabel>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              size={24}
                              style={{ cursor: 'pointer' }}
                              color={(hover ?? field.value) >= rating ? '#ffc107' : '#e4e5e9'}
                              onClick={() => field.onChange(rating)}
                              onMouseEnter={() => setHover(rating)}
                              onMouseLeave={() => setHover(null)}
                            />
                          ))}
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="drugAdviceClear"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apakah Saran Obatnya jelas?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Iya</SelectItem>
                          <SelectItem value="no">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nearbyHelp"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Sudahkah Anda mencoba mencari bantuan di sekitar sini?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Iya</SelectItem>
                          <SelectItem value="no">Tidak</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learnMore"
                  render={() => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Apa yang ingin Anda pelajari lebih lanjut?</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {['Pencegahan', 'Pemanfaatan Obat', 'Kebersihan Kulit', 'Klinik Lokal', 'Lainnya'].map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="learnMore"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center gap-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked ? [...(field.value || []), option] : field.value?.filter((val) => val !== option);
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <span>{option}</span>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Email (Optional)</FormLabel>
                      <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className={'text-base md:text-xl'}>Saran / Komentar Anda</FormLabel>
                      <FormControl><Textarea className={' resize-none'} rows={4} placeholder="Your experience, suggestions, or issues..." {...field} /></FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div>
                        <FormLabel>Saya setuju agar umpan balik saya digunakan secara anonim untuk meningkatkan layanan</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white col-span-2">
                  Kirim Masukan
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </>
  );
};
