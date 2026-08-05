import { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

const REASONS = [
  { id: 'dose', label: 'Duda sobre mi dosis', icon: 'medkit' },
  { id: 'appointment', label: 'Próxima cita', icon: 'calendar' },
  { id: 'nutrition', label: 'Alimentación', icon: 'nutrition' },
  { id: 'missed', label: 'Olvidé tomar mi dosis', icon: 'alert-circle' },
  { id: 'symptoms', label: 'Síntomas o molestias', icon: 'fitness' },
  { id: 'other', label: 'Otro motivo', icon: 'ellipsis-horizontal' },
];

const PRIORITIES = [
  { id: 'normal', label: 'Normal', icon: 'checkmark-circle', color: colors.secondary },
  { id: 'priority', label: 'Prioritario', icon: 'warning', color: colors.warning },
  { id: 'urgent', label: 'Urgente', icon: 'alert-circle', color: colors.accent },
];

export default function ContactScreen() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState('normal');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSend() {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 200,
        useNativeDriver: true,
      }),
    ]).start();

    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setSent(true);
    }, 400);
  }

  if (sent) {
    return (
      <View style={styles.sentContainer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.sentIcon}>
            <Ionicons name="checkmark-circle" size={80} color={colors.secondary} />
          </View>
          <Text style={styles.sentTitle}>Solicitud enviada</Text>
          <Text style={styles.sentDesc}>
            Hemos recibido tu solicitud. El equipo de enfermería se comunicará
            contigo a la brevedad.
          </Text>
          <TouchableOpacity
            style={styles.sentButton}
            onPress={() => {
              setSent(false);
              setSelectedReason(null);
              setMessage('');
              setSelectedPriority('normal');
            }}
          >
            <Text style={styles.sentButtonText}>Enviar otra solicitud</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AnimatedCard delay={100}>
          <Text style={styles.formLabel}>¿Cuál es el motivo de tu consulta?</Text>
          <View style={styles.reasonsGrid}>
            {REASONS.map((reason) => {
              const isSelected = selectedReason === reason.id;
              return (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonChip,
                    isSelected && {
                      backgroundColor: colors.primaryLight,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedReason(reason.id)}
                >
                  <Ionicons
                    name={reason.icon as any}
                    size={20}
                    color={isSelected ? colors.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.reasonChipText,
                      isSelected && { color: colors.primary, fontWeight: '600' },
                    ]}
                  >
                    {reason.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <Text style={styles.formLabel}>Prioridad</Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((p) => {
              const isSelected = selectedPriority === p.id;
              return (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.priorityOption,
                    isSelected && {
                      backgroundColor: p.color + '15',
                      borderColor: p.color,
                    },
                  ]}
                  onPress={() => setSelectedPriority(p.id)}
                >
                  <Ionicons
                    name={p.icon as any}
                    size={20}
                    color={isSelected ? p.color : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.priorityText,
                      isSelected && { color: p.color, fontWeight: '600' },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <Text style={styles.formLabel}>Describe tu consulta</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe aquí tu mensaje..."
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{message.length}/500</Text>
        </AnimatedCard>

        <View style={styles.sendSection}>
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!selectedReason || !message.trim()) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!selectedReason || !message.trim()}
          >
            <Text style={styles.sendButtonText}>Enviar solicitud</Text>
            <Ionicons name="send" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 14,
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reasonChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  reasonChipText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityOption: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  priorityText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.text,
    minHeight: 100,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 6,
  },
  sendSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.textLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  sentContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  sentIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  sentDesc: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  sentButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  sentButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});
