import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

function GreetingHeader() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
      <View>
        <Text style={styles.greeting}>¡Buenos días!</Text>
        <Text style={styles.patientName}>María González</Text>
      </View>
      <View style={styles.avatar}>
        <Ionicons name="person" size={28} color={colors.primary} />
      </View>
    </Animated.View>
  );
}

function QuickStat({ icon, label, value, color }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const QUICK_ACTIONS = [
  {
    icon: 'calendar' as const,
    title: 'Mi Dosis',
    subtitle: 'Ver dosis del mes',
    color: colors.primary,
    screen: 'Dose',
  },
  {
    icon: 'location' as const,
    title: 'Próxima Cita',
    subtitle: 'Ver fecha y lugar',
    color: colors.secondary,
    screen: 'Appointment',
  },
  {
    icon: 'nutrition' as const,
    title: 'Nutrición',
    subtitle: 'Alimentos y Vitamina K',
    color: colors.warning,
    screen: 'Nutrition',
  },
  {
    icon: 'chatbubbles' as const,
    title: 'Contactar',
    subtitle: 'Hablar con enfermería',
    color: colors.accent,
    screen: 'Contact',
  },
];

export default function HomeScreen({ navigation }: any) {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <GreetingHeader />

      <AnimatedCard delay={200}>
        <View style={styles.doseBanner}>
          <View style={styles.doseInfo}>
            <Text style={styles.doseLabel}>Dosis de hoy</Text>
            <Text style={styles.doseValue}>1 pastilla</Text>
            <Text style={styles.doseNote}>Warfarina 5mg</Text>
          </View>
          <View style={styles.doseIcon}>
            <Ionicons name="medkit" size={40} color={colors.primary} />
          </View>
        </View>
      </AnimatedCard>

      <View style={styles.statsRow}>
        <QuickStat
          icon="checkmark-circle"
          label="Próxima cita"
          value="3 días"
          color={colors.secondary}
        />
        <QuickStat
          icon="alert-circle"
          label="Solicitudes"
          value="1"
          color={colors.accent}
        />
      </View>

      <Text style={styles.sectionTitle}>Accesos rápidos</Text>

      {QUICK_ACTIONS.map((action, index) => (
        <AnimatedCard
          key={action.screen}
          delay={300 + index * 100}
          onPress={() => navigation.navigate(action.screen)}
        >
          <View style={styles.actionRow}>
            <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
              <Ionicons name={action.icon} size={24} color={action.color} />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  patientName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doseBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doseInfo: {
    flex: 1,
  },
  doseLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  doseValue: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
  },
  doseNote: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  doseIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
    marginLeft: 14,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  actionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
