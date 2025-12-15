import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button } from './sharedComponents/Button';
import { Card } from './sharedComponents/Card';

interface TaskFormData {
  title: string;
  description: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  initialData?: TaskFormData;
  loading?: boolean;
}

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
});

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const title = watch('title');
  const description = watch('description');

  return (
    <Card>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          placeholder="Task title"
          value={title}
          onChangeText={text => setValue('title', text)}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

        <TextInput
          style={[styles.input, styles.textArea, errors.description && styles.inputError]}
          placeholder="Task description"
          value={description}
          onChangeText={text => setValue('description', text)}
          multiline
          numberOfLines={3}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Button
          title={loading ? 'Submitting...' : 'Submit Task'}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -8,
  },
});
