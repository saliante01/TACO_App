import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

function CountdownTimer({ days }: { days: number }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!mountedRef.current) return;
      animRef.current = Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]);
      animRef.current.start();
    }, 3000);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      animRef.current?.stop();
    };
  }, []);

  return (
    <Animated.View style={[styles.countdownCircle, { transform: [{ scale: pulseAnim }] }]}>
      <Text style={styles.countdownNumber}>{days}</Text>
      <Text style={styles.countdownLabel}>días</Text>
    </Animated.View>
  );
}

export default function AppointmentScreen() {
  const appointments = [
    {
      date: '1 de agosto de 2026',
      time: '09:30 hrs',
      location: 'Clínica RedSalud Providencia',
      address: 'Av. Providencia 1234, Santiago',
      type: 'Control INR',
      notes: 'Asistir en ayunas. Traer carnet TACO.',
      daysLeft: 3,
    },
    {
      date: '1 de septiembre de 2026',
      time: '10:00 hrs',
      location: 'Clínica RedSalud Providencia',
      address: 'Av. Providencia 1234, Santiago',
      type: 'Control INR',
      notes: 'Asistir en ayunas.',
      daysLeft: 34,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AnimatedCard delay={100}>
        <View style={styles.nextAppointmentHeader}>
          <View style={styles.nextAppointmentInfo}>
            <Text style={styles.nextLabel}>Próximo control</Text>
            <Text style={styles.nextType}>{appointments[0].type}</Text>
          </View>
          <CountdownTimer days={appointments[0].daysLeft} />
        </View>

        <View style={styles.detailSection}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={18} color={colors.primary} />
            <Text style={styles.detailText}>{appointments[0].date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={18} color={colors.primary} />
            <Text style={styles.detailText}>{appointments[0].time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location" size={18} color={colors.primary} />
            <View>
              <Text style={styles.detailText}>{appointments[0].location}</Text>
              <Text style={styles.detailSubtext}>{appointments[0].address}</Text>
            </View>
          </View>
        </View>
      </AnimatedCard>

      <AnimatedCard delay={200}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        {[
          { icon: 'moon', text: 'Asistir en ayunas (8 hrs sin alimentos)' },
          { icon: 'id-card', text: 'Traer carnet TACO y documento de identidad' },
          { icon: 'medkit', text: 'No suspender medicación sin indicación médica' },
          { icon: 'time', text: 'Llegar 15 minutos antes de la hora agendada' },
        ].map((item, i) => (
          <View key={i} style={styles.recommendationRow}>
            <View style={styles.recommendationIcon}>
              <Ionicons name={item.icon as any} size={16} color={colors.primary} />
            </View>
            <Text style={styles.recommendationText}>{item.text}</Text>
          </View>
        ))}
      </AnimatedCard>

      <Text style={styles.sectionTitle}>Próximos controles</Text>

      {appointments.slice(1).map((app, i) => (
        <AnimatedCard key={i} delay={300 + i * 100}>
          <View style={styles.futureAppointmentRow}>
            <View style={styles.futureDateBadge}>
              <Text style={styles.futureDay}>
                {app.date.split(' de ')[0]}
              </Text>
              <Text style={styles.futureMonth}>
                {app.date.split(' de ')[1].split(' ')[0]}
              </Text>
            </View>
            <View style={styles.futureInfo}>
              <Text style={styles.futureType}>{app.type}</Text>
              <Text style={styles.futureLocation}>{app.location}</Text>
              <Text style={styles.futureTime}>{app.time}</Text>
            </View>
            <View style={styles.futureDaysBadge}>
              <Text style={styles.futureDaysValue}>{app.daysLeft}</Text>
              <Text style={styles.futureDaysLabel}>días</Text>
            </View>
          </View>
        </AnimatedCard>
      ))}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  nextAppointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextAppointmentInfo: {
    flex: 1,
  },
  nextLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  nextType: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  countdownCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  countdownLabel: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '500',
  },
  detailSection: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  detailSubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 14,
  },
  recommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  futureAppointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  futureDateBadge: {
    width: 48,
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  futureDay: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  futureMonth: {
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  futureInfo: {
    flex: 1,
    marginLeft: 14,
  },
  futureType: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  futureLocation: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  futureTime: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  futureDaysBadge: {
    alignItems: 'center',
  },
  futureDaysValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.warning,
  },
  futureDaysLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
});
